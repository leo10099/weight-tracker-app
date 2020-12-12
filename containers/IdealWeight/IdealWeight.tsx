import React, { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

// Utils
import { colors } from "../../utils/theme";

const IdealWeight = () => {
  // Local State
  const [selectedGender, setSelectedGender] = useState("H");
  const [selectedHeight, setSelectedHeight] = useState(150);
  const [selectedAge, setSelectedAge] = useState(18);
  const [selectedWeight, setSelectedWeight] = useState(50);

  // Handlers
  const onGenderSelected = (value: string | number) =>
    setSelectedGender(value.toString());

  const onHeightSelected = (value: string | number) =>
    setSelectedHeight(Number(value));

  const onAgeSelected = (value: string | number) =>
    setSelectedAge(Number(value));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Peso Ideal</Text>
      <Text style={styles.subTitle}>Calcula tu peso ideal</Text>
      <View style={styles.formContainer}>
        {/* Sexo */}
        <Picker
          style={styles.picker}
          selectedValue={selectedGender}
          onValueChange={onGenderSelected}
          prompt="Selecciona tu sexo"
          dropdownIconColor={colors.pink}
        >
          <Picker.Item label="Hombre" value="H" />
          <Picker.Item label="Mujer" value="M" />
        </Picker>
        {/* Altura */}
        <Picker
          style={styles.picker}
          selectedValue={selectedHeight}
          onValueChange={onHeightSelected}
          prompt="Selecciona tu altura"
          dropdownIconColor={colors.pink}
        >
          {Array.from({ length: 51 }).map((_, idx) => {
            const label = (idx + 150).toString() + " cm";
            const value = idx + 150;

            return <Picker.Item label={label} value={value} key={value} />;
          })}
        </Picker>
        {/* Edad */}
        <Picker
          style={styles.picker}
          selectedValue={selectedAge}
          onValueChange={onAgeSelected}
          prompt="Selecciona tu edad"
          dropdownIconColor={colors.pink}
        >
          {Array.from({ length: 51 }).map((_, idx) => {
            const label = (idx + 50).toString() + " años";
            const value = idx + 50;

            return <Picker.Item label={label} value={value} key={value} />;
          })}
        </Picker>
        {/* Peso */}
        <Picker
          style={styles.picker}
          selectedValue={selectedAge}
          onValueChange={onAgeSelected}
          prompt="Selecciona tu peso"
          dropdownIconColor={colors.pink}
        >
          {Array.from({ length: 150 }).map((_, idx) => {
            const label = (idx + 50).toString() + " kg";
            const value = idx + 50;

            return <Picker.Item label={label} value={value} key={value} />;
          })}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
  },
  title: {
    fontSize: 32,
    color: colors.dark,
    letterSpacing: 1.2,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  subTitle: {
    fontWeight: "500",
    fontSize: 20,
    marginTop: 20,
    color: colors.grey,
  },
  formContainer: {
    marginTop: 40,
  },
  picker: {
    marginTop: 18,
    height: 50,
    width: 160,
    fontSize: 100,
  },
});

export default IdealWeight;
