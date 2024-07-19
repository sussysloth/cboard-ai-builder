import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import styles from './styles';
import AutoAwesome from '@mui/icons-material/AutoAwesome';
import Zoom from '@mui/material/Zoom';

type PictogramGeneratorFormDialogProps = {
  onClose: () => void;
  onGenerateInitClick: (label: string) => void;
  initialInput: string;
  isGeneratingPictograms: boolean;
};

const PictogramGeneratorFormDialog = ({
  onClose,
  onGenerateInitClick,
  initialInput,
  isGeneratingPictograms,
}: PictogramGeneratorFormDialogProps) => {
  const [input, setInput] = useState(initialInput);

  const handleGenerate = () => {
    onGenerateInitClick(input);
  };
  const [activeStars, setActiveStars] = useState(true);

  useEffect(() => {
    const animateStars = () => {
      setActiveStars((prev) => {
        return !prev;
      });
    };
    const intervalId = setInterval(animateStars, 2500);

    return () => clearInterval(intervalId);
  }, [isGeneratingPictograms]);

  return !isGeneratingPictograms ? (
    <Box sx={styles.pictogramGeneratorForm}>
      <Typography variant="body1" gutterBottom>
        Use Pictonizer to generate pictograms
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        Generate 4 pictograms for
      </Typography>

      <TextField
        fullWidth
        variant="standard"
        placeholder="See"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Stack direction="row" justifyContent="flex-end" spacing={2}>
        <Button onClick={onClose}>CANCEL</Button>
        <Button
          variant="contained"
          startIcon={<AutoFixHighIcon />}
          onClick={handleGenerate}
          disabled={!input}
        >
          GENERATE
        </Button>
      </Stack>
    </Box>
  ) : (
    <Box sx={styles.loadingIndicator}>
      <Box sx={styles.starsContainer}>
        <Zoom in={activeStars} timeout={{ enter: 1000, exit: 2000 }}>
          <AutoAwesome color="primary" fontSize="large" />
        </Zoom>
        <Zoom in={activeStars} timeout={{ enter: 2000, exit: 2000 }}>
          <AutoAwesome color="primary" fontSize="large" />
        </Zoom>
        <Zoom in={activeStars} timeout={{ enter: 3000, exit: 2000 }}>
          <AutoAwesome color="primary" fontSize="large" />
        </Zoom>
        <Zoom in={activeStars} timeout={{ enter: 3500, exit: 2000 }}>
          <AutoAwesome color="primary" fontSize="large" />
        </Zoom>
      </Box>
      <Box>
        <Typography textAlign={'center'} variant="body1" gutterBottom>
          Generating 4 pictograms to:
        </Typography>
        <Typography
          fontWeight={'bold'}
          textAlign={'center'}
          variant="body1"
          gutterBottom
        >
          {input}
        </Typography>
      </Box>
    </Box>
  );
};

export default PictogramGeneratorFormDialog;
