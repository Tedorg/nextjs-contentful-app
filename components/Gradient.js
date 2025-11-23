import styles from './Gradient.module.css';

export default function CmsGradient({ shapes = [] }) {
  const gradientStyle = {
    background: shapes.length
      ? shapes.map(s => `radial-gradient(${s})`).join(', ')
      : undefined,
  };

  return <div className={styles.gradientBg} style={gradientStyle} />;
}