import Analytics from "@/app/components/dashboard/analytics";
import Cost from "@/app/components/dashboard/cost";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <div>
      dashbodard page
      <Suspense fallback={<p>loading analytics</p>}>
        <Analytics />
      </Suspense>
      <Cost />
    </div>
  );
};

export default Page;
