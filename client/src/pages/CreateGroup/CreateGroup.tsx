import { useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addDays } from "date-fns";

import {
  useCreateGroupMutation,
  useGetCurrentUserQuery,
} from "../../gql/generated/schema";
import { Form } from "@/components/ui/form";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import { Progress } from "@/components/ui/progress";

const DEFAULT_GROUP = {
  name: "",
  challengeName: "",
  dates: {
    from: new Date(),
    to: addDays(new Date(), 7),
  },
  participants: [],
  ecoActionsIds: [],
};

const formSchema = z.object({
  name: z.string().min(3, "3 caractères minium").max(150),
  challengeName: z.string().min(3, "3 caractères minium").max(150),
  dates: z
    .object({
      from: z.date(),
      to: z.date(),
    })
    .required(),
  participants: z.array(z.number()),
  ecoActionsIds: z.array(z.number()),
});

function CreateGroup() {
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [isTeamChallenge, setIsTeamChallenge] = useState(false);
  const [groupId, setGroupId] = useState<number | null>(null);

  // Queries
  const [createGroup, { loading: processing }] = useCreateGroupMutation();

  const { data } = useGetCurrentUserQuery();
  const currentUser = data?.getCurrentUser;

  const isPartner = currentUser?.subscriptionType === "partner";
  const maxSteps = isTeamChallenge ? 4 : 3;
  const progressValue = (100 / maxSteps) * step;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: DEFAULT_GROUP,
    shouldFocusError: true,
  });

  const handleIsTeamChallenge = (value: boolean) => {
    setIsTeamChallenge(value);
  };

  const handleGoBackInStep = () => {
    setStep((prevStep) => (prevStep === 1 ? 1 : prevStep - 1));
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    if (step === 3) {
      try {
        const createdGroup = await createGroup({
          variables: {
            data: {
              name: values.name,
              challengeName: values.challengeName,
              startDate: values.dates.from,
              endDate: values.dates.to,
              ecoActionsIds: values.ecoActionsIds,
              participants: values.participants,
            },
          },
          // refetchQueries: [{ query: CreateGroupDocument }],
        });

        const createdGroupId = createdGroup.data?.createGroup?.id;

        if (isPartner && isTeamChallenge && createdGroupId) {
          setGroupId(createdGroupId);
          setStep(4);
          return;
        } else if (!isTeamChallenge && createdGroupId) {
          navigate(`/`);
        }
      } catch (err) {
        console.error("err", err);
      } finally {
        console.log("groupe créé !");
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <Progress
            value={progressValue}
            max={maxSteps}
            className="h-4 mt-2 mb-4"
          />
          {step === 1 && (
            <StepOne
              control={form.control}
              isPartner={isPartner}
              isTeamChallenge={isTeamChallenge}
              handleIsTeamChallenge={handleIsTeamChallenge}
            />
          )}
          {step === 2 && (
            <StepTwo
              control={form.control}
              handleGoBackInStep={handleGoBackInStep}
            />
          )}
          {step === 3 && (
            <StepThree
              control={form.control}
              isPartner={isPartner}
              isTeamChallenge={isTeamChallenge}
              handleGoBackInStep={handleGoBackInStep}
              friends={currentUser?.friends || []}
            />
          )}
        </form>
      </Form>
      {step === 4 && (
        <StepFour groupId={groupId} handleGoBackInStep={handleGoBackInStep} />
      )}
    </>
  );
}

export default CreateGroup;
