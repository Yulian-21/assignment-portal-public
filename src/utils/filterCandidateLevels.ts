import { ApiResponse } from "@/types/types";

export function filterCandidateLevels(data: ApiResponse): ApiResponse {
  if (data?.levels) {
    const filteredLevels = data.levels.filter(
      (level) => level === "Junior" || level === "Middle" || level === "Senior"
    );

    return { levels: filteredLevels };
  } else return {levels: []};
}
