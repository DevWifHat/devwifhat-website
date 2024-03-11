import OldVideo from '@/components/shared/OldVideo';
import TokenInfo from '@/components/shared/TokenInfo';
import Header from '@/components/shared/Header';
import Chart from '@/components/shared/Chart';
import NewHeader from '@/components/shared/NewHeader';
import HeaderImage from '@/components/shared/NewHeader';

export default function Home() {
  return (
    <div className='relative'>
      <div className="w-full flex flex-col md:flex-row-reverse items-start justify-center pb-10 border-b border-b-white border-opacity-50">
        <HeaderImage />
        <Header />
      </div>
      {/* <TokenInfo /> */}
      <OldVideo />
      {/* <Chart /> */}
    </div>
  );
}