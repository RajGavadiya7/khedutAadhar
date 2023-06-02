import React from "react";
import { useEffect, useState } from "react";


const Price_table = ({data}) => {
   
    return (

      
        <table className="table">
        <thead>
          <tr>
            <th scope="col"> State </th>
            <th scope="col"> District </th>
            <th scope="col"> Market </th>
            <th scope="col"> Commodity </th>
            <th scope="col"> Variety </th>
            <th scope="col"> Arrival Date </th>
            <th scope="col"> Min Price </th>
            <th scope="col"> Max Price </th>
            <th scope="col"> Modal Price </th>
          </tr>
        </thead>
        
        <tbody>
        {data.map((item) => (
            <tr>
              <th scope="row">{item.state}</th>
              <td> {item.district} </td>
              <td> {item.market} </td>
              <td> {item.commodity} </td>
              <td> {item.variety} </td>
              <td> {item.arrival_date} </td>
              <td> {item.min_price} </td>
              <td> {item.max_price} </td>
              <td> {item.modal_price} </td>
            </tr>
          ))}
        </tbody>
        <style>
          {`
          .table{
            margin: 2rem;
          }
          `}

        </style>
      </table>
      
    )


}

export default Price_table;






























// import { useState } from 'react';
// import {
//   createStyles,
//   Table,
//   ScrollArea,
//   UnstyledButton,
//   Group,
//   Text,
//   Center,
//   TextInput,
//   rem,
// } from '@mantine/core';
// import { keys } from '@mantine/utils';
// import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';

// const useStyles = createStyles((theme) => ({
//   th: {
//     padding: '0 !important',
//   },

//   control: {
//     width: '100%',
//     padding: `${theme.spacing.xs} ${theme.spacing.md}`,

//     '&:hover': {
//       backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
//     },
//   },

//   icon: {
//     width: rem(21),
//     height: rem(21),
//     borderRadius: rem(21),
//   },
// }));

// interface RowData {
//   state: string
//   district: string
//   market: string
//   commodity: string
//   variety: string
//   arrival_date: string
//   min_price: string
//   max_price: string
//   modal_price: string
// }

// interface TableSortProps {
//   data: RowData[];
// }

// interface ThProps {
//   children: React.ReactNode;
//   reversed: boolean;
//   sorted: boolean;
//   onSort(): void;
// }

// function Th({ children, reversed, sorted, onSort }: ThProps) {
//   const { classes } = useStyles();
//   const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
//   return (
//     <th className={classes.th}>
//       <UnstyledButton onClick={onSort} className={classes.control}>
//         <Group position="apart">
//           <Text fw={500} fz="sm">
//             {children}
//           </Text>
//           <Center className={classes.icon}>
//             <Icon size="0.9rem" stroke={1.5} />
//           </Center>
//         </Group>
//       </UnstyledButton>
//     </th>
//   );
// }

// function filterData(data: RowData[], search: string) {
//   const query = search.toLowerCase().trim();
//   return data.filter((item) =>
//     keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
//   );
// }

// function sortData(
//   data: RowData[],
//   payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
// ) {
//   const { sortBy } = payload;

//   if (!sortBy) {
//     return filterData(data, payload.search);
//   }

//   return filterData(
//     [...data].sort((a, b) => {
//       if (payload.reversed) {
//         return b[sortBy].localeCompare(a[sortBy]);
//       }

//       return a[sortBy].localeCompare(b[sortBy]);
//     }),
//     payload.search
//   );
// }

// export function TableSort({ data }: TableSortProps) {
//   const [search, setSearch] = useState('');
//   const [sortedData, setSortedData] = useState(data);
//   const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
//   const [reverseSortDirection, setReverseSortDirection] = useState(false);

//   const setSorting = (field: keyof RowData) => {
//     const reversed = field === sortBy ? !reverseSortDirection : false;
//     setReverseSortDirection(reversed);
//     setSortBy(field);
//     setSortedData(sortData(data, { sortBy: field, reversed, search }));
//   };

//   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const { value } = event.currentTarget;
//     setSearch(value);
//     setSortedData(sortData(data, { sortBy, reversed: reverseSortDirection, search: value }));
//   };

//   const rows = sortedData.map((row) => (
//     <tr key={row.state}>
//       <th> {row.state}</th>
//       <td> {row.district} </td>
//       <td> {row.market} </td>
//       <td> {row.commodity} </td>
//       <td> {row.variety} </td>
//       <td> {row.arrival_date} </td>
//       <td> {row.min_price} </td>
//       <td> {row.max_price} </td>
//       <td> {row.modal_price} </td>
//     </tr>
//   ));

//   return (
//     <ScrollArea>
//       <TextInput
//         placeholder="Search by any field"
//         mb="md"
//         icon={<IconSearch size="0.9rem" stroke={1.5} />}
//         value={search}
//         onChange={handleSearchChange}
//       />
//       <Table horizontalSpacing="md" verticalSpacing="xs" miw={700} sx={{ tableLayout: 'fixed' }}>
//         <thead>
//           <tr>
//             <Th reversed={reverseSortDirection} sorted={sortBy === 'state'} onSort={() => setSorting('state')}> 
//               State
//             </Th>
//             <Th reversed={reverseSortDirection} sorted={sortBy === 'district'} onSort={() => setSorting('district')}>
//               District
//             </Th>
//             <Th reversed={reverseSortDirection} sorted={sortBy === 'market'} onSort={() => setSorting('market')}>
//               Market
//             </Th>
//             <Th reversed={reverseSortDirection} sorted={sortBy === 'commodity'} onSort={() => setSorting('commodity')}>
//               Commodity
//             </Th>
//             <Th reversed={reverseSortDirection} sorted={sortBy === 'variety'} onSort={() => setSorting('variety')}>
//               Variety
//             </Th>
//             <Th reversed={reverseSortDirection} sorted={sortBy === 'arrival_date'} onSort={() => setSorting('arrival_date')}>
//               Arrival Date
//             </Th>
//             <Th reversed={reverseSortDirection} sorted={sortBy === 'min_price'} onSort={() => setSorting('min_price')}>
//               Min Price
//             </Th>
//             <Th reversed={reverseSortDirection} sorted={sortBy === 'max_price'} onSort={() => setSorting('max_price')}>
//               Max Price
//             </Th>
//             <Th reversed={reverseSortDirection} sorted={sortBy === 'modal_price'} onSort={() => setSorting('modal_price')}>
//               Modal Price
//             </Th>
            
            
//           </tr>
//         </thead>
//         <tbody>
//           {rows.length > 0 ? (
//             rows
//           ) : (
//             <tr>
//               <td colSpan={Object.keys(data[0]).length}>
//                 <Text weight={500} align="center">
//                   Nothing found
//                 </Text>
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </ScrollArea>
//   );
// }