type Props = React.SVGProps<SVGSVGElement>;

export default function PlaceholderIcon(props: Props) {
  return (
    <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M40.5 5.5h-33a2 2 0 0 0-2 2v33a2 2 0 0 0 2 2h33a2 2 0 0 0 2-2v-33a2 2 0 0 0-2-2ZM24 42.5v-37M42.5 18.5H23.9M23.9 30.5H5.4"
      />
    </svg>
  );
}
