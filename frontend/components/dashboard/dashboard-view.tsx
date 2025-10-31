"use client";

import { useMemo, useState } from "react";
import { Plus, MoreHorizontal, Pencil, Trash2, Loader2, Search as SearchIcon, Film, LayoutGrid, List } from "lucide-react";
import { toast } from "sonner";
import { useInfiniteMovies } from "@/hooks/use-infinite-movies";
import { useMovieMutations } from "@/hooks/use-movie-mutations";
import { useDebounce } from "@/hooks/use-debounce";
import type { Movie } from "@/lib/types";
import { MovieForm, type MovieFormSchema } from "@/components/dashboard/movie-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const currencyFormatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function formatBudget(budget: string | null) {
  if (!budget) return "—";
  const numeric = Number.parseFloat(budget);
  if (Number.isNaN(numeric)) return budget;
  return currencyFormatter.format(numeric);
}

function formatDateTime(isoDate: string) {
  return new Date(isoDate).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function toFormDefaults(movie: Movie): MovieFormSchema {
  return {
    title: movie.title,
    director: movie.director,
    budget: movie.budget,
    location: movie.location,
    duration: movie.duration,
    releaseYear: movie.releaseYear,
    releaseDate: movie.releaseDate ? movie.releaseDate.slice(0, 10) : null,
    description: movie.description,
    posterUrl: movie.posterUrl,
    omdbId: movie.omdbId,
  };
}

export function DashboardView() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"createdAt" | "title" | "releaseYear">("createdAt");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const debouncedSearch = useDebounce(search, 400);

  const movieQuery = useInfiniteMovies({ search: debouncedSearch, sort, order });
  const { createMutation, updateMutation, deleteMutation } = useMovieMutations();

  const movies = useMemo(() => movieQuery.data?.pages.flatMap((page) => page.data) ?? [], [movieQuery.data]);

  const handleCreate = async (values: MovieFormSchema) => {
    try {
      await createMutation.mutateAsync(values);
      setIsCreateOpen(false);
      toast.success("Movie added to your library");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create movie";
      toast.error(message);
    }
  };

  const handleUpdate = async (values: MovieFormSchema) => {
    if (!editingMovie) return;
    try {
      await updateMutation.mutateAsync({ id: editingMovie.id, values });
      setEditingMovie(null);
      toast.success("Movie updated");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update movie";
      toast.error(message);
    }
  };

  const handleDelete = async (movie: Movie) => {
    const confirmed = window.confirm(`Delete “${movie.title}”? This cannot be undone.`);
    if (!confirmed) return;
    try {
      await deleteMutation.mutateAsync(movie.id);
      toast.success("Movie deleted");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete movie";
      toast.error(message);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {/* Header Section - Two-tone with primary accent */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border border-primary/20 shadow-lg">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        <div className="relative flex flex-col gap-4 sm:gap-5 md:flex-row md:items-end md:justify-between p-6 sm:p-8">
          <div className="space-y-2 sm:space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">Your Collection</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground sm:text-base max-w-2xl">
              Track every film and series you follow. Import from OMDb or add entries manually.
            </p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2 w-full sm:w-auto shadow-lg hover:shadow-2xl transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground group relative overflow-hidden ring-2 ring-primary/50 hover:ring-primary hover:scale-105">
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                
                {/* Pulse animation background */}
                <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                
                {/* Icon with rotation */}
                <Plus className="h-5 w-5 relative z-10 transition-transform group-hover:rotate-180 duration-500" />
                
                {/* Text with glow effect */}
                <span className="relative z-10 font-semibold text-base group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                  New Movie
                </span>
                
                {/* Gradient border glow */}
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary via-primary/50 to-primary opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 -z-10" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add a movie</DialogTitle>
                <DialogDescription>Complete the form to store this title inside your Filmora dashboard.</DialogDescription>
              </DialogHeader>
              <MovieForm onSubmit={handleCreate} loading={createMutation.isPending} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Collection Overview Card - Two-tone design */}
      <Card className="shadow-xl border-2 border-primary/10 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <CardHeader className="gap-4 sm:gap-5 pb-5 sm:pb-6 p-5 sm:p-7 bg-gradient-to-br from-primary/5 via-transparent to-transparent border-b border-primary/10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary to-primary/30" />
                <CardTitle className="text-xl sm:text-2xl font-bold">Collection Overview</CardTitle>
              </div>
              <CardDescription className="text-sm">
                Filter by title, sort by latest additions, or focus on classic releases.
              </CardDescription>
            </div>
            
            {/* View Toggle - Enhanced UX */}
            <div className="flex items-center gap-1.5 bg-primary/10 backdrop-blur-sm rounded-xl p-1.5 border border-primary/20 shadow-sm self-start">
              <Button
                variant={viewMode === "card" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("card")}
                className={`gap-2 h-9 px-4 transition-all duration-200 ${
                  viewMode === "card" 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-primary/20 text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Cards</span>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={`gap-2 h-9 px-4 transition-all duration-200 ${
                  viewMode === "list" 
                    ? "bg-primary text-primary-foreground shadow-md" 
                    : "hover:bg-primary/20 text-muted-foreground hover:text-foreground"
                }`}
              >
                <List className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">List</span>
              </Button>
            </div>
          </div>
          
          {/* Filters Section - Enhanced UX with visual hierarchy */}
          <div className="flex flex-col gap-4 sm:gap-5">
            {/* Search Bar - Primary action */}
            <div className="relative w-full group">
              <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none z-10" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search your library..."
                className="pl-12 pr-4 h-12 sm:h-13 text-sm sm:text-base border-2 border-primary/20 focus:border-primary/50 bg-background/50 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md focus:shadow-lg transition-all duration-200 placeholder:text-muted-foreground/60"
              />
              {search && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full hover:bg-primary/10"
                >
                  <span className="sr-only">Clear search</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </Button>
              )}
            </div>
            
            {/* Sort & Order - Secondary controls with better visual grouping */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="flex flex-col gap-2 group">
                <Label htmlFor="sort" className="text-xs sm:text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors flex items-center gap-2">
                  <div className="h-1 w-6 rounded-full bg-primary/30 group-focus-within:bg-primary transition-colors" />
                  Sort by
                </Label>
                <Select value={sort} onValueChange={(value) => setSort(value as typeof sort)}>
                  <SelectTrigger id="sort" className="h-11 sm:h-12 text-sm border-2 border-primary/20 focus:border-primary/50 bg-background/50 backdrop-blur-sm rounded-lg hover:bg-primary/5 transition-all">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-2 border-primary/20">
                    <SelectItem value="createdAt" className="rounded-md">Recently added</SelectItem>
                    <SelectItem value="title" className="rounded-md">Title</SelectItem>
                    <SelectItem value="releaseYear" className="rounded-md">Release year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2 group">
                <Label htmlFor="order" className="text-xs sm:text-sm font-medium text-muted-foreground group-focus-within:text-primary transition-colors flex items-center gap-2">
                  <div className="h-1 w-6 rounded-full bg-primary/30 group-focus-within:bg-primary transition-colors" />
                  Order
                </Label>
                <Select value={order} onValueChange={(value) => setOrder(value as typeof order)}>
                  <SelectTrigger id="order" className="h-11 sm:h-12 text-sm border-2 border-primary/20 focus:border-primary/50 bg-background/50 backdrop-blur-sm rounded-lg hover:bg-primary/5 transition-all">
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-2 border-primary/20">
                    <SelectItem value="desc" className="rounded-md">Descending</SelectItem>
                    <SelectItem value="asc" className="rounded-md">Ascending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 sm:space-y-7 p-5 sm:p-7 pt-0">
          {/* Results count and status */}
          {!movieQuery.isLoading && !movieQuery.isError && movies.length > 0 && (
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="font-medium">
                  {movies.length} {movies.length === 1 ? 'movie' : 'movies'} found
                </span>
              </div>
              {debouncedSearch && (
                <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                  Filtered
                </Badge>
              )}
            </div>
          )}

          {movieQuery.isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
                  <Skeleton className="h-20 w-20 rounded-lg shrink-0 bg-primary/10" />
                  <div className="flex w-full flex-col gap-2.5">
                    <Skeleton className="h-5 w-2/3 bg-primary/10" />
                    <Skeleton className="h-4 w-1/2 bg-primary/10" />
                    <Skeleton className="h-3 w-1/3 bg-primary/10" />
                  </div>
                </div>
              ))}
            </div>
          ) : movieQuery.isError ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border-2 border-dashed border-destructive/30 bg-destructive/5 p-12 text-center">
              <div className="rounded-full bg-destructive/10 p-4">
                <SearchIcon className="h-10 w-10 text-destructive" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-semibold text-destructive">
                  {movieQuery.error instanceof Error ? movieQuery.error.message : "Unable to load movies"}
                </p>
                <p className="text-sm text-muted-foreground">Try refreshing after signing in again.</p>
              </div>
            </div>
          ) : movies.length ? (
            <>
              {/* Card View */}
              {viewMode === "card" && (
                <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {movies.map((movie) => (
                    <Card key={movie.id} className="group overflow-hidden border-2 border-primary/10 hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-background to-primary/5">
                      <div className="relative">
                        {/* Movie Poster */}
                        <div className="relative aspect-[2/3] w-full overflow-hidden bg-muted">
                          {movie.posterUrl ? (
                            <>
                              <img 
                                src={movie.posterUrl} 
                                alt={`${movie.title} poster`}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  target.style.display = 'none';
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                              <div className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                                <Film className="h-16 w-16 text-muted-foreground/20" />
                              </div>
                            </>
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                              <div className="text-center">
                                <Film className="h-16 w-16 mx-auto text-muted-foreground/20 mb-2" />
                                <span className="text-4xl font-bold text-muted-foreground/30">
                                  {movie.title.charAt(0)}
                                </span>
                              </div>
                            </div>
                          )}
                          
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                          
                          {/* Actions Menu - Enhanced UX */}
                          <div className="absolute top-3 right-3 z-10">
                            <DropdownMenu modal={false}>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="secondary" 
                                  size="icon" 
                                  className="h-9 w-9 rounded-full bg-background/95 backdrop-blur-md hover:bg-primary hover:text-primary-foreground border-2 border-primary/20 opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl hover:scale-110"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="z-50 rounded-xl border-2 border-primary/20 shadow-xl">
                                <DropdownMenuItem
                                  onSelect={(event) => {
                                    event.preventDefault();
                                    setEditingMovie(movie);
                                  }}
                                  className="gap-2 rounded-lg cursor-pointer"
                                >
                                  <Pencil className="h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={(event) => {
                                    event.preventDefault();
                                    void handleDelete(movie);
                                  }}
                                  className="gap-2 text-destructive focus:text-destructive rounded-lg cursor-pointer"
                                >
                                  <Trash2 className="h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>

                        {/* Movie Info - Enhanced typography */}
                        <div className="p-4 space-y-3 bg-gradient-to-br from-primary/5 to-transparent">
                          <div className="space-y-2">
                            <h3 className="font-bold text-base leading-tight line-clamp-2 min-h-[2.5rem] group-hover:text-primary transition-colors">
                              {movie.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2">
                              {movie.location ? (
                                <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-primary/10 text-primary border border-primary/20">
                                  {movie.location}
                                </Badge>
                              ) : null}
                              {movie.releaseYear ? (
                                <span className="text-xs font-medium text-muted-foreground">{movie.releaseYear}</span>
                              ) : null}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground pt-2 border-t border-primary/10">
                            <div className="truncate">
                              <span className="font-semibold text-foreground/70">Director:</span> {movie.director || "—"}
                            </div>
                            <div className="text-right font-medium">
                              {movie.duration ? `${movie.duration} min` : "—"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}

              {/* List View */}
              {viewMode === "list" && (
                <div className="space-y-3">
                  {movies.map((movie) => (
                    <Card key={movie.id} className="group overflow-hidden border-2 border-primary/10 hover:border-primary/30 shadow-md hover:shadow-xl transition-all duration-200 bg-gradient-to-r from-background via-background to-primary/5">
                      <div className="flex gap-4 p-5">
                        <div className="shrink-0">
                          {movie.posterUrl ? (
                            <div className="relative h-28 w-20 sm:h-32 sm:w-24 rounded-lg overflow-hidden bg-muted border border-border/50 shadow-sm">
                              <img 
                                src={movie.posterUrl} 
                                alt={`${movie.title} poster`}
                                className="h-full w-full object-cover"
                                loading="lazy"
                                onError={(e) => {
                                  const target = e.currentTarget;
                                  target.style.display = 'none';
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'flex';
                                }}
                              />
                              <div className="hidden h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/50">
                                <Film className="h-8 w-8 text-muted-foreground/30" />
                              </div>
                            </div>
                          ) : (
                            <div className="h-28 w-20 sm:h-32 sm:w-24 rounded-lg bg-gradient-to-br from-muted to-muted/50 border border-border/50 flex items-center justify-center">
                              <div className="text-center">
                                <Film className="h-8 w-8 mx-auto text-muted-foreground/30 mb-1" />
                                <span className="text-xs font-bold text-muted-foreground/40">
                                  {movie.title.charAt(0)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-sm sm:text-base leading-tight truncate">
                                {movie.title}
                              </h3>
                              <div className="flex flex-wrap items-center gap-1.5 mt-1">
                                {movie.location ? (
                                  <Badge variant="secondary" className="text-xs px-1.5 py-0">
                                    {movie.location}
                                  </Badge>
                                ) : null}
                                {movie.releaseYear ? (
                                  <span className="text-xs text-muted-foreground">{movie.releaseYear}</span>
                                ) : null}
                              </div>
                            </div>
                            <DropdownMenu modal={false}>
                              <DropdownMenuTrigger asChild>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-9 w-9 shrink-0 rounded-full hover:bg-primary/10 hover:text-primary border-2 border-transparent hover:border-primary/20 transition-all duration-200"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="z-50 rounded-xl border-2 border-primary/20 shadow-xl">
                                <DropdownMenuItem
                                  onSelect={(event) => {
                                    event.preventDefault();
                                    setEditingMovie(movie);
                                  }}
                                  className="gap-2 rounded-lg cursor-pointer"
                                >
                                  <Pencil className="h-4 w-4" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onSelect={(event) => {
                                    event.preventDefault();
                                    void handleDelete(movie);
                                  }}
                                  className="gap-2 text-destructive focus:text-destructive rounded-lg cursor-pointer"
                                >
                                  <Trash2 className="h-4 w-4" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Director:</span>
                              <span className="truncate">{movie.director || "—"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Duration:</span>
                              <span>{movie.duration ? `${movie.duration} min` : "—"}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Budget:</span>
                              <span className="truncate">{formatBudget(movie.budget)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="font-medium">Release:</span>
                              <span>{movie.releaseDate ? formatDateTime(movie.releaseDate) : "—"}</span>
                            </div>
                          </div>
                          <div className="text-xs text-muted-foreground pt-1 border-t">
                            Added {formatDateTime(movie.createdAt)}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center gap-5 rounded-2xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-primary/5 to-transparent p-12 sm:p-16 text-center">
              <div className="rounded-full bg-primary/10 p-6">
                <SearchIcon className="h-12 w-12 text-primary/50" />
              </div>
              <div className="space-y-2">
                <p className="text-base font-semibold text-foreground">No movies yet</p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Start building your collection by importing from OMDb or adding movies manually.
                </p>
              </div>
              <Button 
                onClick={() => setIsCreateOpen(true)} 
                className="gap-2 w-full sm:w-auto shadow-lg hover:shadow-xl transition-all group mt-2"
              >
                <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" /> 
                Add your first movie
              </Button>
            </div>
          )}

          {movieQuery.hasNextPage ? (
            <div className="flex justify-center pt-4">
              <Button
                variant="outline"
                onClick={() => movieQuery.fetchNextPage()}
                disabled={movieQuery.isFetchingNextPage}
                className="gap-2 w-full sm:w-auto border-2 border-primary/20 hover:border-primary/50 hover:bg-primary/5 shadow-md hover:shadow-lg transition-all duration-200"
              >
                {movieQuery.isFetchingNextPage ? <Loader2 className="h-4 w-4 animate-spin text-primary" /> : null}
                <span className="font-medium">{movieQuery.isFetchingNextPage ? "Loading more..." : "Load more movies"}</span>
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Dialog open={Boolean(editingMovie)} onOpenChange={(open) => (open ? null : setEditingMovie(null))}>
        <DialogContent className="max-w-[95vw] sm:max-w-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit movie</DialogTitle>
            <DialogDescription>Update metadata and keep your catalog accurate.</DialogDescription>
          </DialogHeader>
          {editingMovie ? (
            <MovieForm
              defaultValues={toFormDefaults(editingMovie)}
              onSubmit={handleUpdate}
              loading={updateMutation.isPending}
              submitLabel="Save changes"
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
