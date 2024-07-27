import NewProject from '@/components/Project/NewProject';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import getAllProjects from '@/functions/getAllProjects';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

export default async function Page() {
  const info = await getAllProjects();

  return (
    <main>
      <section className="">
        <div>Projects</div>
        <NewProject otherUsers={info.otherUser} user={info.user} />
      </section>
      <section className="m-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {info.projects.map((project) => (
          <Card key={project.id}>
            <CardHeader>
              <CardTitle className="text-xl">{project.name}</CardTitle>
              <CardDescription className="text-sm">
                {project.description}
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="justify-end gap-4">
              <Button>
                <Link
                  href={project.githubLink || ''}
                  className="flex items-center gap-3"
                >
                  <GitHubLogoIcon className="h-6 w-6" /> Github
                </Link>
              </Button>
              <Button>
                <Link href={`/project/${project.id}`}>View Project</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </main>
  );
}
