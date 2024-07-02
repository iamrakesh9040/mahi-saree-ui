import { useSwr } from "@/hooks";
import { PublicLayout } from "@/layouts";

const FAQ = () => {
  const { data, isValidating } = useSwr(`faq`);

  return (
    <PublicLayout title="FAQ | Shree Odisha Handloom">
      <div className="main-container py-10 font-medium prose prose-sm flex flex-col gap-5 p-10">
        <h2>
          <strong>FAQ</strong>
        </h2>
        {data?.map((item: any, i: any) => (
          <div key={i} className="flex flex-col gap-2">
            <span className="flex flex-col gap-2">
              <h3 className="flex items-center gap-3">
                <p className="p-[0.2rem] bg-gray-400 rounded-full"></p>
                <p className="text-base">
                  <h1>{item?.question}</h1>
                </p>
              </h3>
            </span>
            {/* <h1>{item?.question}</h1> */}
            <p className="text-sm font-normal">{item?.answer}</p>
          </div>
        ))}
      </div>
    </PublicLayout>
  );
};

export default FAQ;
