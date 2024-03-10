import OldVideo from '@/components/shared/OldVideo';
import TokenInfo from '@/components/shared/TokenInfo';
import Header from '@/components/shared/Header';
import Chart from '@/components/shared/Chart';

export default function Home() {
  return (
    <div className='relative'>
      <Header />
      <TokenInfo />
      <OldVideo />
      {/* <Chart /> */}
    </div>
  );
}