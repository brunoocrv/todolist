import { TrashSimple } from '@phosphor-icons/react';

import styles from './Task.module.css';

type TaskProps = {
  hasDone: boolean;
  description: string;
  handleChange: () => void;
  handleRemove: () => void;
}

export function Task({ hasDone, description, handleChange, handleRemove }: TaskProps) {
  return (
    <section className={styles.task}>
      <div className={styles.label}>
        <input type="checkbox" checked={hasDone} onChange={() => handleChange()} />
        {
          !hasDone 
          ? <span>{description}</span> 
          : <span className={styles.taskDone}>{description}</span>
        }
      </div>
      <button onClick={handleRemove}>
        <TrashSimple size={20} />
      </button>
    </section>
  )
}