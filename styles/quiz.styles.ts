import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    gap: 16,
  },
  progressContainer: {
    gap: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden' as const,
  },
  progressFill: {
    height: '100%' as const,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600' as const,
  },
  timerContainer: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'flex-start' as const,
  },
  timerText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700' as const,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between' as const,
  },
  questionContainer: {
    gap: 16,
  },
  questionNumber: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '600' as const,
  },
  questionText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '800' as const,
    lineHeight: 38,
    marginBottom: 20,
  },

  answersContainer: {
    gap: 12,
  },
  answerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 4,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 0,
  },
  answerButtonSelected: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  answerButtonCorrect: {
    backgroundColor: '#10B981',
  },
  answerButtonIncorrect: {
    backgroundColor: '#EF4444',
  },
  answerText: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#1E293B',
    flex: 1,
  },
  answerTextSelected: {
    color: '#FFFFFF',
  },
  errorText: {
    color: '#FFFFFF',
    fontSize: 18,
    textAlign: 'center' as const,
  },
  scrollContent: {
  padding: 24,
  paddingBottom: 100, // Pour éviter que les réponses collent au bas
},
questionImage: {
  width: '100%',
  height: undefined,
  aspectRatio: 16/9,    // ✔️ image responsive
  borderRadius: 4,
  //marginTop: ,
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  marginBottom: 24,
},

});
