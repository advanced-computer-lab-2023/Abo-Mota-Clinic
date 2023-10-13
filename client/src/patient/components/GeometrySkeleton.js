import * as React from 'react';
import Skeleton from '@mui/joy/Skeleton';

export default function GeometrySkeleton({ transition }) {
  return (
    // <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pr-14 ml-16'>
        <Skeleton variant="rectangular" transition={transition} width={280} height="24em" />
        <Skeleton variant="rectangular" transition={transition} width={280} height="24em" />
        <Skeleton variant="rectangular" transition={transition} width={280} height="24em" />
        <Skeleton variant="rectangular" transition={transition} width={280} height="24em" />
        <Skeleton variant="rectangular" transition={transition} width={280} height="24em" />
        <Skeleton variant="rectangular" transition={transition} width={280} height="24em" />
        <Skeleton variant="rectangular" transition={transition} width={280} height="24em" />
        <Skeleton variant="rectangular" transition={transition} width={280} height="24em" />
        <Skeleton variant="rectangular" transition={transition} width={280} height="24em" />
        <Skeleton variant="rectangular" transition={transition} width={280} height="24em" />
        <Skeleton variant="rectangular" transition={transition} width={280} height="24em" />
        <Skeleton variant="rectangular" transition={transition} width={280} height="24em" />
      </div>
    // </Box>
  );
}