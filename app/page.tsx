import OldVideo from '@/components/shared/OldVideo';
import TokenInfo from '@/components/shared/TokenInfo';
import Header from '@/components/shared/Header';
import Chart from '@/components/shared/Chart';
import NewHeader from '@/components/shared/NewHeader';
import HeaderImage from '@/components/shared/NewHeader';
import HighCharts from '@/components/shared/HighCharts';
import NewChart from '@/components/shared/NewChart';

export default function Home() {
  return (
    <div className='relative'>
      <div className="w-full flex flex-col lg:flex-row-reverse items-start justify-center pb-10 border-b border-b-white border-opacity-50">
        <HeaderImage />
        <Header />
      </div>
      {/* <TokenInfo /> */}
      {/* <HighCharts /> */}
      <NewChart />
      {/* <OldVideo /> */}
      <div className="flex lg:hidden">
        <TokenInfo />
      </div>
      {/* <Chart /> */}
    </div>
  );
}