'use client';
import React from 'react';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import styles from './styles';
import { TileRecord } from '@/commonTypes/Tile';
import Box from '@mui/material/Box';

import EmblaCarousel from './EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';

export default function TileEditor({
  onClose,
  // tile: { suggestedImages, id: tileId },
  tile,
}: {
  onClose: () => void;
  tile: TileRecord;
}) {
  const handleClose = () => {
    onClose();
  };

  const OPTIONS: EmblaOptionsType = { loop: true };
  const SLIDE_COUNT = 4;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  console.log(SLIDES);
  return (
    <>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={styles.modal}
      >
        <Paper id="tileEditor" sx={styles.paper}>
          <Box sx={styles.imageControls}>
            <EmblaCarousel
              slides={SLIDES || []}
              options={OPTIONS}
              tileColor={tile.backgroundColor || 'white'}
            />
          </Box>
        </Paper>
      </Modal>
    </>
  );
}
