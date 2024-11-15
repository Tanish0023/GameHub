import { getSearch } from "@/lib/search-service";
import ResultsCard, { ResultsCardSkeleton } from "./results-card";
import { Skeleton } from "@/components/ui/skeleton";

interface ResultsProps{
    term?: string;
}

const Results = async ({
    term
}: ResultsProps) => {
    const data = await getSearch(term);
    
    return ( 
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Results for term &quot;{term}&quot;
            </h2>
            {data.length === 0 && (
                <p className="text-muted-foreground text-sm">
                    No results found. Try searching for something else
                </p>
            )}
            <div className="flex flex-col gap-y-4">
                {data.map((result) => (
                    <ResultsCard key={result.id} data={result} />
                ))}
            </div>
        </div>
     );
}
 
export default Results;

export const ResultsSkeleton = () => {
    return(
        <div>
            <Skeleton className="h-8 w-[290px] mb-4" />
            <div className="flex flex-col gap-y-4">
                {[...Array(4)].map((_,i) => (
                    <ResultsCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}
