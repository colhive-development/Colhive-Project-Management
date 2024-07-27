'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { FC, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'sonner';

const newProjectFormSchema = z.object({
  name: z
    .string({
      required_error: 'Project name is needed.',
    })
    .trim(),
  description: z.string({
    required_error: 'Please provide a short note on project.',
  }),
  githubLink: z.string(),
  organizationHeadID: z.string(),
  memberIDs: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
});

interface NewProjectProps {
  otherUsers: User[] | undefined;
  user: User | null | undefined;
}

const NewProject: FC<NewProjectProps> = ({ otherUsers, user }) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const form = useForm<z.infer<typeof newProjectFormSchema>>({
    resolver: zodResolver(newProjectFormSchema),
    defaultValues: {
      name: '',
      description: '',
      githubLink: '',
      organizationHeadID: user?.id,
      memberIDs: [],
    },
  });

  function onSubmit(values: z.infer<typeof newProjectFormSchema>) {
    setIsCreating(true);
    let members = values.memberIDs;
    members.push(values.organizationHeadID);
    axios
      .post('/api/project', {
        name: values.name,
        description: values.description,
        githubLink: values.githubLink,
        organizationHeadID: values.organizationHeadID,
        memberIDs: members,
      })
      .then((response: AxiosResponse) => {
        if (response.status == 200) {
          toast.success(response.data.message);
        }
      })
      .catch((error: AxiosError<any, any>) => {
        if (error.status == 500) {
          toast.error(error.response?.data.message || '');
        }
      })
      .finally(() => setIsCreating(false));
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ New Project</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px] md:max-w-[900px]">
        <DialogHeader>
          <DialogTitle className="text-lg lg:text-2xl">
            Create New Project
          </DialogTitle>
          <DialogDescription>
            Please enter the information needed below to start managing your new
            project with us.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <div className="grid-cols-2 md:grid md:gap-4">
                <div>
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Name*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Name of your Project"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project Description*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="What this project is in short"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="githubLink"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Github Link</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Link for github for this project"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="memberIDs"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="text-base">
                            Select Members
                          </FormLabel>
                          <FormDescription>
                            Select the members you want in the team.
                          </FormDescription>
                        </div>
                        <ScrollArea className="h-40">
                          {otherUsers?.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="memberIDs"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={item.id}
                                    className="flex flex-row items-center space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.id,
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== item.id,
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="py-1 font-normal">
                                      <div className="flex items-center gap-4">
                                        <Avatar>
                                          <AvatarImage
                                            src={item.image || undefined}
                                            alt=""
                                          />
                                          <AvatarFallback>
                                            {item.name?.charAt(0).toUpperCase()}
                                          </AvatarFallback>
                                        </Avatar>
                                        <div>
                                          <p className="font-bold">
                                            {item.name}
                                          </p>
                                          <p>{item.email}</p>
                                        </div>
                                      </div>
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                        </ScrollArea>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4">
                <DialogClose asChild>
                  <Button
                    disabled={isCreating}
                    type="button"
                    variant="secondary"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button disabled={isCreating} type="submit">
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewProject;
