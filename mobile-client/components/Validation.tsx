import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import {
  useCreateUserEcoActionMutation,
  useGetValidationsByEcoActionQuery,
} from "../gql/generated/schema";

interface ValidationProps {
  ecoActionId: number;
  groupId: number;
  refetchParent: () => void;
}

const Validation = ({
  ecoActionId,
  groupId,
  refetchParent,
}: ValidationProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<string>("0");

  const [createUserEcoAction] = useCreateUserEcoActionMutation();
  const { data, loading } = useGetValidationsByEcoActionQuery({
    variables: { ecoActionId },
  });
  const validations = data?.getValidationsByEcoAction;

  const radioButtons: RadioButtonProps[] = useMemo(
    () =>
      validations?.map((validation) => ({
        id: validation.id.toString(),
        label: validation.points.toString() + " pts",
        value: validation.points.toString(),
      })) || [],
    []
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnText}>Valider</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonCLoseText}>X</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.modalTitle}>Je note mon défi</Text>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedPoint}
                selectedId={selectedPoint}
                containerStyle={styles.radioGroup}
              />
            </View>
            <View>
              <Text>J'ajoute une preuve</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Validation;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    backgroundColor: "orange",
    borderRadius: 5,
  },
  btnText: {
    textTransform: "uppercase",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
    position: "relative",
  },
  buttonClose: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 50,
  },
  buttonCLoseText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  modalView: {
    display: "flex",
    gap: 10,
    position: "relative",
    backgroundColor: "#DDE2D2",
    margin: 20,
    padding: 35,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  radioGroup: {
    flexDirection: "row",
  },
});
