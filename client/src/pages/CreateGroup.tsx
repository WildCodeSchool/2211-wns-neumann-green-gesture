import {
  Stack,
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Center,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { RangeDatepicker } from "chakra-dayzed-datepicker";

import Layout from "../containers/Layout";
import {
  CreateGroupDocument,
  useCreateGroupMutation,
  useGetCurrentUserQuery,
  useGetFreeEcoActionsQuery,
  useGetUserEcoActionsQuery,
} from "../gql/generated/schema";

import { Select } from "chakra-react-select";
import { useNavigate } from "react-router-dom";

const MONTHS = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

export interface Item {
  label: string;
  value: string;
}

function CreateGroup() {
  const navigate = useNavigate();
  const { data } = useGetCurrentUserQuery();
  const currentUser = data?.getCurrentUser;

  const { data: dataFreeEcoAction } = useGetFreeEcoActionsQuery();
  const freeEcoActions = dataFreeEcoAction?.getFreeEcoActions;

  const { data: dataUserEcoAction } = useGetUserEcoActionsQuery();
  const userEcoActions = dataUserEcoAction?.getUserEcoActions;

  const [createGroup, { loading: processing }] = useCreateGroupMutation();

  const [groupName, setGroupName] = useState("");
  const [challengeName, setChallengeName] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);
  const [selectedEcoActions, setSelectedEcoActions] = useState<Item[]>([]);

  const freeEcoActionsList: Item[] =
    freeEcoActions?.map((ecoAction) => ({
      label: ecoAction.name,
      value: ecoAction.id.toString(),
    })) || [];

  const userEcoActionsList: Item[] =
    userEcoActions?.map((ecoAction) => ({
      label: ecoAction.name,
      value: ecoAction.id.toString(),
    })) || [];

  const ecoActionsList: Item[] = [...freeEcoActionsList, ...userEcoActionsList];

  const handleSelectChange = (selectedEcoActions: any) => {
    setSelectedEcoActions(selectedEcoActions);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createGroup({
        variables: {
          data: {
            name: groupName,
            challengeName: challengeName,
            startDate: selectedDates[0],
            endDate: selectedDates[1],
            ecoActionsIds: selectedEcoActions.map((ecoAction) =>
              Number(ecoAction.value)
            ),
            participants: [],
          },
        },
        // refetchQueries: [{ query: CreateGroupDocument }],
      });
      navigate("/");
    } catch (err) {
      console.error("err", err);
    } finally {
      console.log("groupe créé !");
    }
  };

  return (
    <Layout>
      <Center h={"calc(100vh - 4rem)"}>
        <Box
          onSubmit={handleSubmit}
          as="form"
          sx={{
            border: "1px solid black",
            borderRadius: "5px",
            padding: 4,
            textAlign: "center",
            width: "100%",
            maxWidth: "700px",
          }}
        >
          <Stack spacing={3} mt={4} paddingX={8}>
            <FormControl>
              <FormLabel htmlFor="groupName">Nom du groupe</FormLabel>
              <Input
                id="groupName"
                name="groupName"
                onChange={({ target }) => setGroupName(target.value)}
                value={groupName}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="challengeName">Nom du challenge</FormLabel>
              <Input
                id="challengeName"
                name="challengeName"
                onChange={({ target }) => setChallengeName(target.value)}
                value={challengeName}
              />
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="datePicker">Durée du challenge</FormLabel>
              <RangeDatepicker
                id="datePicker"
                selectedDates={selectedDates}
                onDateChange={setSelectedDates}
                configs={{
                  monthNames: MONTHS,
                  dayNames: DAYS,
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Sélectionnez vos éco-actions</FormLabel>
              <Select
                isMulti
                name="colors"
                options={ecoActionsList}
                placeholder="Vos éco-actions disponibles..."
                variant="outline"
                closeMenuOnSelect={false}
                noOptionsMessage={() => (
                  <p>Il n'y a plus d'eco-actions disponibles !</p>
                )}
                onChange={handleSelectChange}
              />
            </FormControl>
          </Stack>

          <Button
            type="submit"
            sx={{
              textTransform: "uppercase",
              marginTop: 5,
              marginBottom: 1,
              bg: "accent",
              color: "white",
            }}
          >
            Je crée mon groupe
          </Button>
        </Box>
      </Center>
    </Layout>
  );
}

export default CreateGroup;
