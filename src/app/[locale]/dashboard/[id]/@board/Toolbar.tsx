import React, { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import PrintIcon from '@mui/icons-material/Print';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { saveBoard, updateBoard } from './actions';
import { useBoundStore } from '@/providers/StoreProvider';
import { useShallow } from 'zustand/react/shallow';
import { BoardRecord } from '@/commonTypes/Board';
import { useRouter } from '@/navigation';
import { usePathname } from '@/navigation';
import { STASHED_CONTENT_ID } from '../constants';

type Props = {
  onEditClick: () => void;
};

export default function Toolbar({ onEditClick }: Props) {
  const [isFullscreen, setisFullscreen] = useState(false);
  const [isSaving, setisSaving] = useState(false);
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      //if not fullscreen
      document.documentElement.requestFullscreen();
      setisFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setisFullscreen(false);
      }
    }
  };
  const router = useRouter();
  const onSaveBoard = async (board: BoardRecord, isNewBoard: boolean) => {
    try {
      setisSaving(true);

      const savedBoard = isNewBoard
        ? await saveBoard(board)
        : await updateBoard(board);
      setBoardIsUpToDate();
      router.push(`/dashboard/${savedBoard._id}`);
    } catch (err) {
      console.error(err);
    }
    setisSaving(false);
  };

  const [board, isOutdated, setBoardIsUpToDate] = useBoundStore(
    useShallow((state) => [
      state.board,
      state.isOutdated,
      state.setBoardIsUpToDate,
    ]),
  );
  const pathname = usePathname();

  const isNewBoard = useMemo(() => {
    const parts = pathname.split('/');
    const boardId = parts[parts.length - 1];
    return boardId === STASHED_CONTENT_ID;
  }, [pathname]);

  if (!board) return null;

  const isBoardOutdated = isOutdated || isNewBoard;

  return (
    <Box sx={{ display: 'flex' }}>
      <IconButton onClick={toggleFullscreen}>
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </IconButton>
      <IconButton onClick={onEditClick}>
        <EditIcon fontSize="small" />
      </IconButton>
      <IconButton>
        <DownloadIcon fontSize="small" />
      </IconButton>
      <IconButton>
        <PrintIcon fontSize="small" />
      </IconButton>
      <Divider orientation="vertical" flexItem />
      <IconButton
        disabled={isSaving || !isBoardOutdated}
        onClick={() => onSaveBoard(board, isNewBoard)}
      >
        <BookmarkBorderIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
