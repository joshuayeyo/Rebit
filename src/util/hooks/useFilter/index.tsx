import { useEffect, useState } from 'react';

type FilterType = string | null;

function useFilter<T>(
  data: T[],
  filterKey: keyof T,
  initialFilter: FilterType = null,
) {
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const [filteredData, setFilteredData] = useState<T[]>(data);

  useEffect(() => {
    const updateFilteredData = () => {
      if (filter === null || filter == 'ALL') {
        setFilteredData(data);
      } else {
        const result = data.filter((item) => {
          const itemType = item[filterKey]?.toString().trim();
          const currentFilter = filter.toString().trim();
          return itemType === currentFilter;
        });
        setFilteredData(result);
      }
    };
    updateFilteredData();
  }, [data, filter, filterKey]);

  return { filteredData, setFilter };
}

export default useFilter;
