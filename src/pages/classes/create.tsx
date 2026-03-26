import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb";
import { CreateView } from "@/components/refine-ui/views/create-view"
import { Button } from "@/components/ui/button"
import { Card, 
        CardContent, 
        CardHeader, 
        CardTitle,
        CardDescription,
        CardFooter, 
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useBack } from "@refinedev/core"
import { Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { classSchema } from "@/lib/schema";
import { useForm } from "@refinedev/react-hook-form";
import * as z from 'zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UploadWidget from "@/components/upload-widget";

const ClassesCreate = () => {
    const back = useBack();
    const form = useForm<z.infer<typeof classSchema>>({
        resolver: zodResolver(classSchema),
        refineCoreProps: {
            resource: 'classes',
            action: 'create',
        },
        defaultValues: {
          name:'',  
          description: '',
          subjectId: undefined,
          teacherId: '',
          capacity: undefined,
          status: 'active',
          bannerUrl: '',
          bannerCldPubId: '',
          inviteCode:'',
          schedules: [],
        },
    })

    const {
        refineCore: { onFinish },
        handleSubmit,
        formState: { isSubmitting, errors },
        control,
    } = form; 
    
    
    const onSubmit = async (values: z.infer<typeof classSchema>) => {
      try {
        console.log(values,'value for submit');
        
      } catch (error) {
        console.error("Error creating class:", error);
      }
    };


    const teachers = [
      { id: 1, name: "John Doe" },
      { id: 2, name: "Jane Smith" }
    ];

    const subjects = [
      { id: 1, name: "Mathematics", code: "MATH" },
      { id: 2, name: "Biology", code: "BIO" }
    ];

    const bannerPublicId = form.watch("bannerCldPubId");
    const setBannerImage = ( file : any, field : any ) => {
      console.log(typeof(file),'file');
      console.log(typeof(field),'field');
      
      if(file) {
        field.onChange(file.url);
        form.setValue("bannerCldPubId", file.publicId, {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
      else{
        field.onChange('');
        form.setValue("bannerCldPubId", '', {
          shouldValidate: true,
          shouldDirty: true,
        })
      }
    }    
  return (
    <CreateView className="class-view">
        <Breadcrumb />
        <h1 className="page-title">Create a Class</h1>
        <div className="intro-row">
            <p>Provide the required information below to add a new class.</p>
            <Button onClick={back}>Go Back</Button>
        </div>

        <Separator />

        <div className="my-4 flex items-center">
            <Card className="class-form-card">
                <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl pb-0 font-bold">Fill out the form</CardTitle>
                </CardHeader>

                <Separator/>
                <CardContent className="mt-7 px-6">
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <Controller
                      name="bannerUrl"
                      control={control}
                      render={({ field}) => (
                        <Field>
                          <FieldLabel>
                            Banner image <span className="text-orange-600">*</span>
                          </FieldLabel>
                          <UploadWidget
                            value={field.value ? { url: field.value, publicId: bannerPublicId ?? ''} : null }
                            onChange={(file : any, field : any) => setBannerImage(file, field)}
                          />
                          <Field>
                            {errors.bannerCldPubId && !errors.url && (
                              <FieldError className="text-destructive text-sm">{errors.bannerCldPubId.message}</FieldError>
                            )}
                          </Field>
                        </Field>
                      )}
                    />
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                          <Field>
                            <FieldLabel>
                              Class Name
                              <span className="text-orange-600">*</span>
                            </FieldLabel>
                            <Input value={field.value} placeholder="Introduction to Biology - Section A" onChange={(e) => {
                              field.onChange(e.target.value)
                            }}/>
                          </Field>
                      )}
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                        <Controller
                          name="subjectId"
                          control={control}
                          render={({ field }) => (
                              <Field>
                                <FieldLabel>
                                  Subject
                                  <span className="text-orange-600">*</span>
                                </FieldLabel>
                                <Select onValueChange={(value) => field.onChange(Number(value))} value={field?.value?.toString()}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a subject"/>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {subjects.map((subject) => (
                                      <SelectItem value={subject.id.toString()} key={subject.id}>
                                        {subject.name} ({subject.code})
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </Field>
                          )}
                        />
                        <Controller
                          name="teacherId"
                          control={control}
                          render={({ field }) => (
                              <Field>
                                <FieldLabel>
                                  Teacher
                                  <span className="text-orange-600">*</span>
                                </FieldLabel>
                                <Select onValueChange={(value) => field.onChange(value)} value={field?.value?.toString()}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a teacher"/>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {teachers.map((teacher) => (
                                      <SelectItem value={teacher.id.toString()} key={teacher.id}>
                                        {teacher.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </Field>
                          )}
                        />
                        <Controller
                          name="capacity"
                          control={control}
                          render={({ field }) => (
                              <Field>
                                <FieldLabel>
                                  Capacity
                                </FieldLabel>
                                <Input 
                                  type="number" 
                                  min={1}
                                  value={(field.value as number | undefined) ?? ''} 
                                  placeholder="30" 
                                  onChange={(e) => {
                                    const value = e.target.value
                                    field.onChange(value ? Number(value) : undefined);
                                  }}
                                  name={field.name}
                                  onBlur={field.onBlur}
                                  ref={field.ref}
                                />
                              </Field>
                          )}
                        />
                        <Controller
                          name="status"
                          control={control}
                          render={({ field }) => (
                              <Field>
                                <FieldLabel>
                                  Status
                                  <span className="text-orange-600">*</span>
                                </FieldLabel>
                                <Select onValueChange={(value) => field.onChange(value)} value={field?.value?.toString()}>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a status"/>
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                  </SelectContent>
                                </Select>
                              </Field>
                          )}
                        />
                    </div>
                    <Controller
                      name="description"
                      control={control}
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>
                            Description
                          </FieldLabel>
                          <Textarea 
                            {...field}
                            placeholder="Brief description about the class"
                          />
                        </Field>
                      )}
                    />
                    <Separator/>
                    <Button type="submit">submit</Button>
                  </form>
                </CardContent>
            </Card>
        </div>
    </CreateView>
  )
}

export default ClassesCreate