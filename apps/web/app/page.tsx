import MessagingDemo from '../src/components/MessagingDemo';
import AuthTest from '../src/components/AuthTest';
import DomainTest from '../src/components/DomainTest';

export default function Home() {
  return (
    <main>
      <h1>HappyTails Web Dashboard</h1>
      <p>Shelter administration and coordination platform</p>
      <DomainTest />
      <AuthTest />
      <MessagingDemo />
    </main>
  )
}
