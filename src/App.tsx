import { useSyncExternalStore, type ComponentType } from 'react';
import './App.css';
import { LoginForm } from './exercises/10-form-basic/Form';
import { ProfileForm } from './exercises/11-single-field-validation/Form';
import { RegistrationForm } from './exercises/12-cross-field-form-validation/Form';
import { FormSandbox } from './exercises/91-form-sandbox/Form';

type Exercise = {
  number: string;
  path: string;
  title: string;
  summary: string;
  topic: string;
  target: string;
  Form: ComponentType;
};

const exercises: Exercise[] = [
  {
    number: '10',
    path: '#/exercise/10',
    title: 'React Hook FormとZodの統合',
    summary: 'ログインフォームをZodスキーマへ接続します。',
    topic: 'zodResolver',
    target: 'src/exercises/10-form-basic/Form.tsx',
    Form: LoginForm,
  },
  {
    number: '11',
    path: '#/exercise/11',
    title: '単項目バリデーション',
    summary: 'プロフィールの各入力項目へ検証条件を追加します。',
    topic: 'string / number',
    target: 'src/exercises/11-single-field-validation/schema.ts',
    Form: ProfileForm,
  },
  {
    number: '12',
    path: '#/exercise/12',
    title: '項目間バリデーション',
    summary: '2つのパスワードが一致することを検証します。',
    topic: 'refine / path',
    target: 'src/exercises/12-cross-field-form-validation/schema.ts',
    Form: RegistrationForm,
  },
  {
    number: '91',
    path: '#/exercise/91',
    title: 'フォームSandbox',
    summary: 'フォームとZodスキーマを自由に編集して動作を確認します。',
    topic: 'React Hook Form / zodResolver',
    target: 'src/exercises/91-form-sandbox/',
    Form: FormSandbox,
  },
];

function subscribeToHashChange(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}

function getHash() {
  return window.location.hash || '#/';
}

function Header() {
  return (
    <header className="app-header">
      <a className="brand" href="#/" aria-label="Exercise一覧へ戻る">
        <span className="brand-mark">Z</span>
        <span>Zod Exercises</span>
      </a>
      <nav aria-label="Exerciseナビゲーション">
        {exercises.map((exercise) => (
          <a key={exercise.number} href={exercise.path}>
            {exercise.number}
          </a>
        ))}
      </nav>
    </header>
  );
}

function ExerciseList() {
  return (
    <main className="exercise-index">
      <header className="index-heading">
        <p className="eyebrow">Exercise 1</p>
        <h1>フォームとの統合</h1>
        <p>ZodとReact Hook Formを、実際の入力画面で確かめます。</p>
      </header>

      <div className="exercise-list" aria-label="Exercise一覧">
        {exercises.map((exercise) => (
          <a
            className="exercise-row"
            href={exercise.path}
            key={exercise.number}
          >
            <span className="exercise-number">{exercise.number}</span>
            <span className="exercise-copy">
              <strong>{exercise.title}</strong>
              <span>{exercise.summary}</span>
            </span>
            <code>{exercise.topic}</code>
            <span className="row-arrow" aria-hidden="true">
              →
            </span>
          </a>
        ))}
      </div>
    </main>
  );
}

function ExerciseScreen({ exercise }: { exercise: Exercise }) {
  const { Form } = exercise;

  return (
    <main className="exercise-screen">
      <a className="back-link" href="#/">
        ← Exercise一覧
      </a>

      <div className="screen-heading">
        <p className="eyebrow">Exercise {exercise.number}</p>
        <h1>{exercise.title}</h1>
        <p>{exercise.summary}</p>
      </div>

      <div className="workspace">
        <aside className="task-panel">
          <p className="panel-label">編集対象</p>
          <code>{exercise.target}</code>
          <p className="panel-label">キーワード</p>
          <p>{exercise.topic}</p>
        </aside>

        <section className="form-surface" aria-labelledby="form-title">
          <div className="surface-heading">
            <h2 id="form-title">入力フォーム</h2>
          </div>
          <Form />
        </section>
      </div>
    </main>
  );
}

function App() {
  const hash = useSyncExternalStore(subscribeToHashChange, getHash, () => '#/');
  const exercise = exercises.find((item) => item.path === hash);

  return (
    <div className="app-shell">
      <Header />
      {exercise ? <ExerciseScreen exercise={exercise} /> : <ExerciseList />}
      <footer>Built for Zod v4 practice</footer>
    </div>
  );
}

export default App;
