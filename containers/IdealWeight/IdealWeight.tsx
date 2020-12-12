import React, { useState, useMemo } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

// Utils
import { colors } from '../../utils/theme';
import { getIdealWeight } from '../../utils/calcs';

// Illustrations
import Illustration from '../../assets/man-over.svg';

// Types
import { Gender } from '../../@types/gender';

const IdealWeight = () => {
  // Local State
  const [selectedGender, setSelectedGender] = useState<'M' | 'H'>('H');
  const [selectedHeight, setSelectedHeight] = useState(150);
  const [selectedWeight, setSelectedWeight] = useState(50);
  const [idealWeight, setIdealWeight] = useState(0);

  // Handlers
  const onGenderSelected = (value: Gender) => setSelectedGender(value);
  const onHeightSelected = (value: string | number) => setSelectedHeight(Number(value));
  const onWeightSelected = (value: string | number) => setSelectedWeight(Number(value));

  const onCtaPressed = () => {
    if (!idealWeight) {
      const calculatedIdealWeight = getIdealWeight(selectedGender, selectedHeight);
      setIdealWeight(Number(calculatedIdealWeight));
      return;
    }
    setIdealWeight(0);
  };

  // Memos
  const weightDifferential = useMemo(() => {
    if (!idealWeight)
      return {
        diffentialWeightLabel: '',
        isInIdealWeight: false,
        value: 0,
      };

    const differential = Math.round(selectedWeight - idealWeight);

    return {
      diffentialWeightLabel: differential > 0 ? 'encima' : 'debajo',
      isInIdealWeight: differential === 0,
      value: differential,
    };
  }, [idealWeight, selectedWeight]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Peso Ideal</Text>
      {!idealWeight && <Text style={styles.subTitle}>Calcula tu peso ideal</Text>}
      {idealWeight ? (
        <View style={styles.resultContainer}>
          <Illustration width={200} height={300}></Illustration>
          <Text style={styles.resultText}>Tu peso ideal es {idealWeight.toString()} kg</Text>
          {weightDifferential.isInIdealWeight ? (
            <Text style={styles.resultText}>¡FELICITACIONES! ¡ESTÁS EN TU PESO IDEAL!</Text>
          ) : (
            <Text style={styles.resultText}>
              Estas {Math.abs(weightDifferential.value).toString()} kgs por{' '}
              {weightDifferential.diffentialWeightLabel} de tu peso ideal
            </Text>
          )}
        </View>
      ) : (
        <View style={styles.formContainer}>
          {/* Sexo */}
          <Picker
            style={styles.picker}
            selectedValue={selectedGender}
            onValueChange={value => onGenderSelected(value as Gender)}
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
              const label = (idx + 150).toString() + ' cm';
              const value = idx + 150;

              return <Picker.Item label={label} value={value} key={value} />;
            })}
          </Picker>
          {/* Peso */}
          <Picker
            style={styles.picker}
            selectedValue={selectedWeight}
            onValueChange={onWeightSelected}
            prompt="Selecciona tu peso"
            dropdownIconColor={colors.pink}
          >
            {Array.from({ length: 150 }).map((_, idx) => {
              const label = (idx + 50).toString() + ' kg';
              const value = idx + 50;

              return <Picker.Item label={label} value={value} key={value} />;
            })}
          </Picker>
        </View>
      )}

      {idealWeight ? (
        <TouchableOpacity style={styles.cta} onPress={onCtaPressed}>
          <Text style={styles.ctaText}>VOLVER</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.cta} onPress={onCtaPressed}>
          <Text style={styles.ctaText}>CALCULAR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    margin: 'auto',
  },
  title: {
    color: colors.dark,
    fontSize: 32,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  subTitle: {
    color: colors.grey,
    fontSize: 20,
    fontWeight: '500',
    marginTop: 20,
  },
  formContainer: {
    marginTop: 40,
  },
  picker: {
    fontSize: 100,
    height: 50,
    marginTop: 18,
    width: 160,
  },
  cta: {
    backgroundColor: colors.red,
    borderRadius: 5,
    marginTop: 40,
    minWidth: 160,
    padding: 16,
    textAlign: 'center',
  },
  ctaText: {
    color: colors.yellow,
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 20,
  },
  resultContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: 40,
  },
  resultText: {
    marginTop: 20,
  },
});

export default IdealWeight;
