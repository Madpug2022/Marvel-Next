const HeartIconFilled = ({
  className,
  testId,
}: {
  className?: string;
  testId?: string;
}) => {
  return (
    <svg
      width="13"
      height="12"
      viewBox="0 0 13 12"
      data-testid={testId}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.71436 2.37318L3.71435 0.552368L0.714355 2.37318V6.27491L6.71436 11.3905L12.7144 6.27491V2.37318L9.71436 0.552368L6.71436 2.37318Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
};
export default HeartIconFilled;
