

interface Props {
  GTM_ID: string;
}

const GTMIFrame = ({ GTM_ID }: Props) => {
  return (
    <noscript
      dangerouslySetInnerHTML={{
        __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
      }}
    />
  );
};

export default GTMIFrame;
