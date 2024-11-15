import { useMemo, useState } from 'react';

type FilterType = string | null;

function useFilter<T>(
  data: T[],
  filterKey: keyof T,
  initialFilter: FilterType = null,
) {
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const filteredData = useMemo(() => {
    if (filter === null || filter == 'ALL') {
      return data;
    } else {
      return data.filter((item) => {
        const itemType = item[filterKey]?.toString().trim();
        const currentFilter = filter.toString().trim();
        return itemType === currentFilter;
      });
    }
  }, [data, filter, filterKey]);

  return { filteredData, setFilter };
}

export default useFilter;
