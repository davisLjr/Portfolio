export type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
} & (
  | { linkType: 'external'; url: string }
  | { linkType: 'modal'; modalDetails: string[] }
);
