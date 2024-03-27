import EachFilterTab from '@/components/proposals/each-filter-tab';
import SearchInput from '@/components/ui/search-input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Proposals = () => {
  const tabs: { title: string; value: string }[] = [
    { title: 'All', value: '0' },
    { title: 'Active', value: '1' },
    { title: 'Pending', value: '2' },
    { title: 'Executed', value: '3' },
    { title: 'Failed', value: '4' },
  ];
  return (
    <div className="space-y-8">
      <h1 role="heading" className="text-white font-medium text-xl">
        Proposals
      </h1>

      <Tabs
        defaultValue={tabs[0].value}
        className="w-full"
      >
        <TabsList className="w-full justify-start space-x-6 border-b-2 border-b-[#292929]">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.title} value={tab.value} className="w-fit">
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="0" className='text-[#777777] text-sm font-light'>
            <EachFilterTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Proposals;
