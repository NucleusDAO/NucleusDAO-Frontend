'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { newFeatureSchema } from '@/libs/validations/help-center-schema';
import FormGroup from '@/components/ui/form-group';
import { ChangeEvent } from 'react';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/libs/utils';
import { useMutation } from '@tanstack/react-query';
import { createTicket } from '@/config/apis';

const NewFeature = () => {
  const form = useForm<z.infer<typeof newFeatureSchema>>({
    resolver: zodResolver(newFeatureSchema),
    defaultValues: {
      email: '',
      subject: '',
      descriptions: '',
      image: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createTicket,
    onSuccess: (response: any) => toast.success(response.message),
    onError: (error) => toast.error(error.message),
  });

  const onSubmit = async (data: any) => {
    const payload = {
      subject: 'New Feature Suggestion',
      channel: 'Email',
      category: 'New Feature',
      priority: 'Medium',
      webUrl: data.image,
      email: data.email,
      description: data.descriptions,
      // ...data,
    };
    mutate(payload);
  };

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const maxSize: number = 3 * 2048 * 2048;
    const file: any = e.target.files?.[0];
    if (file.size >= maxSize) {
      toast.error('File is too large. Max size of 6mb');
    } else {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          form.setValue('image', result);
          form.setError('image', { message: '' });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2
          className="dark:text-white text-dark font-medium text-xl"
          role="heading"
        >
          New Feature
        </h2>
        <p className="text-defaultText text-sm font-light">
          Have an idea for a new feature? Share your suggestions with us!
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email Address <span className="text-[#DD3857]">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email address"
                    {...field}
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Share your idea for a new feature with us{' '}
                  <span className="text-[#DD3857]">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Share your idea" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="descriptions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Could you provide further details about the idea?{' '}
                  <span className="text-[#DD3857]">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea placeholder="Explain idea" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Feel free to include a drawing or image illustrating your idea
                </FormLabel>
                <FormControl>
                  <FormGroup className="">
                    <div
                      className={cn(
                        'bg-light dark:bg-[#1E1E1E] px-8 items-center py-8 rounded-lg text-center dark:text-white text-dark text-sm border-dashed dark:border-[#292929] border-[#CCCCCC99]',
                        field.value ? 'w-fit flex' : 'w-full'
                      )}
                      role="button"
                    >
                      {field.value && (
                        <div className="flex space-x-2 items-end">
                          <Avatar className="w-32 h-32 rounded-lg">
                            <AvatarImage
                              src={field.value}
                              className="object-cover"
                            />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <p className="text-[10px]">Change</p>
                        </div>
                      )}
                      {!field.value && (
                        <div>
                          <p>Drag and Drop file</p>
                          <p>or</p>
                          <p className="text-primary">Browse</p>
                        </div>
                      )}
                    </div>
                    <Input
                      type="file"
                      className="absolute h-full border-b border-0 rounded-none inset-0 cursor-pointer opacity-0"
                      accept=".jpg, .jpeg, .png"
                      onChange={handleUpload}
                    />
                  </FormGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="px-12"
              loading={isPending}
              loadingText="Sending..."
            >
              Send
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewFeature;
