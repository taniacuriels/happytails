import MessagingDemo from '../src/components/MessagingDemo';
import AuthTest from '../src/components/AuthTest';

export default function Home() {
  return (
    <main>
      <h1>HappyTails Web Dashboard</h1>
      <p>Shelter administration and coordination platform</p>
      
      <AuthTest />
      <MessagingDemo />
    </main>
  )
}
