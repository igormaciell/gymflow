import React from 'react';
import { FlatList } from 'react-native';
import EmptyState from '../EmptyState';
import styles from './styles';

// Lista genérica (FlatList). É o componente FILHO dos filtros:
// recebe por props os dados já filtrados pela tela (componente pai).
export default function DataList({
  data,
  renderItem,
  emptyText,
  emptyIcon = 'search-outline',
  refreshing = false,
  onRefresh,
  ListHeaderComponent,
  keyExtractor = (item) => String(item.id),
}) {
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={<EmptyState icon={emptyIcon} message={emptyText} />}
      contentContainerStyle={styles.content}
      refreshing={refreshing}
      onRefresh={onRefresh}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    />
  );
}
