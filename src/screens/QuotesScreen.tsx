// filepath: src/screens/QuotesScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QUOTES_API = 'https://zenquotes.io/api/random';

interface Quote {
  q: string;
  a: string;
}

export default function QuotesScreen() {
  const navigation = useNavigation();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchQuote = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    try {
      const response = await fetch(QUOTES_API);
      const data: Quote[] = await response.json();
      if (data && data.length > 0) {
        setQuote(data[0]);
      }
    } catch (error) {
      console.error('Failed to fetch quote:', error);
      setQuote({
        q: 'The only bad workout is the one that didn\'t happen.',
        a: 'Unknown',
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const onRefresh = () => {
    fetchQuote(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Text style={styles.header}>Motivational Quotes</Text>
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4CAF50" />
        </View>
      ) : (
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteIcon}>"</Text>
          <Text style={styles.quoteText}>{quote?.q}</Text>
          <Text style={styles.quoteIcon}>"</Text>
          <Text style={styles.author}>- {quote?.a || 'Unknown'}</Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={() => fetchQuote(true)}>
        <Text style={styles.buttonText}>Get New Quote</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 32,
    textAlign: 'center',
    paddingTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  quoteIcon: {
    fontSize: 48,
    color: '#4CAF50',
    lineHeight: 48,
  },
  quoteText: {
    fontSize: 20,
    color: '#212121',
    lineHeight: 32,
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: 16,
  },
  author: {
    fontSize: 16,
    color: '#757575',
    textAlign: 'center',
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#4CAF50',
    fontSize: 16,
  },
});