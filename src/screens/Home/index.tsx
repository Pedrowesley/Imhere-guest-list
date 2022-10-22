import React, { useState } from "react";
import { Alert, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export function Home() {
  const [participantName, setParticipantName] = useState("");
  const [participants, setParticipants] = useState([] as string[]);

  function handleParticipantAdd(name: string) {
    if (participants.includes(name?.trim())) {
      return Alert.alert("Participante existe", "Já existe um participante na lista com esse nome.");
    }
    setParticipants([...participants, name.trim()]);
    setParticipantName("");
    Alert.alert("Participante adicionado com sucesso");
  }

  function handleParticipantRemove(name: string) {
    Alert.alert("Remover", `Remover o participante ${name}?`, [
      {
        text: "Sim",
        onPress: () => {
          // remove participant
          setParticipants((oldParticipants) => oldParticipants.filter((participant) => participant !== name));
          Alert.alert("Removido", `O participante ${name} foi removido com sucesso.`);
        },
      },
      {
        text: "Não",
        style: "cancel",
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Formatura</Text>

      <Text style={styles.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome do participante"
          placeholderTextColor="#6B6B6B"
          value={participantName}
          onChangeText={(e) => setParticipantName(e)}
        />

        <TouchableOpacity style={styles.button} onPress={() => handleParticipantAdd(participantName)}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => <Participant key={item} name={item} onRemove={() => handleParticipantRemove(item)} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes a sua lista de presença.
          </Text>
        )}
      />
    </View>
  );
}
