import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeRaw from 'rehype-raw';
import styles from './MarkdownConfig.module.scss';

const MarkdownConfig = ({ content }: { content: string }) => {
  return (
    <div className={styles.markdown}>
      <Markdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug, rehypeRaw]}
        skipHtml={false}
      />
    </div>
  );
};

export default MarkdownConfig;
