import getProjectById from '@/functions/getProjectByIds';

interface PageProps {
  params: {
    projectID: string;
  };
}

async function Page({ params: { projectID } }: PageProps) {
  const project = await getProjectById(projectID);

  return <div>{JSON.stringify(project)}</div>;
}

export default Page;
