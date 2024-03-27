'use client';
import { Button } from '@/components/ui/button';
import { DaoTemplateList } from '@/config/dao-config';
import { DAO_INFO_URL } from '@/config/path';
import { cn } from '@/libs/utils';
import { useRouter } from 'next/navigation';

const CreateNewDao = () => {
  const router = useRouter();
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-medium text-white text-xl">Select Template</h1>
        <p className="text-[#888888] text-sm">
          With our pre-defined templates, this platform enables you to create
          your organization using a customizable template.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 pb-4">
        {DaoTemplateList.map((template) => (
          <div
            key={template.title}
            className="rounded-lg p-4 bg-[#1E1E1E] space-y-5"
          >
            <div
              className="h-[130px] text-white flex items-center rounded-lg justify-center"
              style={{ backgroundColor: template.color }}
            >
              {template.icon}
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <h2 className="text-white font-medium text-lg">
                  {template.title}
                </h2>
                {template.status && (
                  <div className="bg-[#DCBB0C] rounded-md p-2 text-xs font-light text-white">
                    {template.status}
                  </div>
                )}
              </div>
              <p className="text-defaultText text-sm">{template.description}</p>
            </div>
            <Button
            type="button"
              className={cn(
                'w-full',
                template.status === 'Coming Soon' &&
                  'bg-[#191919] text-[#444444]'
              )}
              disabled={!!template.status}
              onClick={() => router.push(DAO_INFO_URL)}
            >
              Proceed
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateNewDao;
