"use client";

import { useMemo, useState } from "react";
import { Plus, MoreHorizontal, Pencil, Trash2, Loader2, Search as SearchIcon } from "lucide-react";
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
    <div className="space-y-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Track every film and series you follow. Import from OMDb or add entries manually.</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New movie
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a movie</DialogTitle>
              <DialogDescription>Complete the form to store this title inside your Filmora dashboard.</DialogDescription>
            </DialogHeader>
            <MovieForm onSubmit={handleCreate} loading={createMutation.isPending} />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader className="gap-4 pb-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <CardTitle className="text-2xl">Collection overview</CardTitle>
            <CardDescription>Filter by title, sort by latest additions, or focus on classic releases.</CardDescription>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-md">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search your library"
                className="pl-9"
              />
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <div className="flex items-center gap-2">
                <Label htmlFor="sort">Sort by</Label>
                <Select value={sort} onValueChange={(value) => setSort(value as typeof sort)}>
                  <SelectTrigger id="sort" className="w-[180px]">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="createdAt">Recently added</SelectItem>
                    <SelectItem value="title">Title</SelectItem>
                    <SelectItem value="releaseYear">Release year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Label htmlFor="order">Order</Label>
                <Select value={order} onValueChange={(value) => setOrder(value as typeof order)}>
                  <SelectTrigger id="order" className="w-[180px]">
                    <SelectValue placeholder="Order" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="desc">Descending</SelectItem>
                    <SelectItem value="asc">Ascending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {movieQuery.isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-lg" />
                  <div className="flex w-full flex-col gap-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : movieQuery.isError ? (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border/60 p-12 text-center text-destructive">
              <SearchIcon className="h-6 w-6" />
              <div className="space-y-2">
                <p className="text-sm font-medium">{movieQuery.error instanceof Error ? movieQuery.error.message : "Unable to load movies"}</p>
                <p className="text-xs text-muted-foreground">Try refreshing after signing in again.</p>
              </div>
            </div>
          ) : movies.length ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Director</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Budget</TableHead>
                  <TableHead>Release</TableHead>
                  <TableHead>Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {movies.map((movie) => (
                  <TableRow key={movie.id}>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium leading-tight">{movie.title}</span>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {movie.location ? <Badge variant="secondary">{movie.location}</Badge> : null}
                          {movie.releaseYear ? <span>{movie.releaseYear}</span> : null}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{movie.director}</TableCell>
                    <TableCell>{movie.duration ? `${movie.duration} min` : "—"}</TableCell>
                    <TableCell>{formatBudget(movie.budget)}</TableCell>
                    <TableCell>{movie.releaseDate ? formatDateTime(movie.releaseDate) : "—"}</TableCell>
                    <TableCell>{formatDateTime(movie.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onSelect={(event) => {
                              event.preventDefault();
                              setEditingMovie(movie);
                            }}
                            className="gap-2"
                          >
                            <Pencil className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onSelect={(event) => {
                              event.preventDefault();
                              void handleDelete(movie);
                            }}
                            className="gap-2 text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-border/60 p-12 text-center text-muted-foreground">
              <SearchIcon className="h-6 w-6" />
              <div className="space-y-2">
                <p className="text-sm font-medium">No movies yet</p>
                <p className="text-xs">Start by importing from OMDb or add one manually.</p>
              </div>
              <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
                <Plus className="h-4 w-4" /> Add your first movie
              </Button>
            </div>
          )}

          {movieQuery.hasNextPage ? (
            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={() => movieQuery.fetchNextPage()}
                disabled={movieQuery.isFetchingNextPage}
                className="gap-2"
              >
                {movieQuery.isFetchingNextPage ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                {movieQuery.isFetchingNextPage ? "Loading more" : "Load more"}
              </Button>
            </div>
          ) : null}
        </CardContent>
      </Card>

      <Dialog open={Boolean(editingMovie)} onOpenChange={(open) => (open ? null : setEditingMovie(null))}>
        <DialogContent>
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
