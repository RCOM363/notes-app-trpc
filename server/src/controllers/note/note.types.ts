export interface CreateNoteProps {
  title: string;
  content: string;
  userId: number;
}

export interface GetNoteByIdProps {
  noteId: number;
  userId: number;
}

export interface UpdateNoteProps extends CreateNoteProps, GetNoteByIdProps {}

export interface DeleteNoteProps extends GetNoteByIdProps {}
