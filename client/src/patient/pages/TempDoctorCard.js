import * as React from 'react';
import Box from '@mui/joy/Box';
import Skeleton from '@mui/material/Skeleton';
import DoctorCard from './DoctorCard';

export default function GeometrySkeleton() {
  return (
    <DoctorCard>
      <Skeleton />
    </DoctorCard>
  );
}