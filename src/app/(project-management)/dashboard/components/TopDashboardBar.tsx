import NewProject from '@/components/Project/NewProject';
import getOtherUsers from '@/functions/getOtherUsers';
import React from 'react';

const TopDashboardBar = async () => {
  const data = await getOtherUsers();
  return (
    <div className="m-5">
      <NewProject otherUsers={data?.otherUsers} user={data?.user} />
    </div>
  );
};

export default TopDashboardBar;
