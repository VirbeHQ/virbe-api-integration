#!/usr/bin/env tsx
/**
 * Test script for the conversation message endpoint
 *
 * Usage:
 *   # Test SSE (streaming) mode
 *   tsx test-conversation-endpoint.ts stream
 *
 *   # Test JSON (batch) mode
 *   tsx test-conversation-endpoint.ts batch
 */

const responseType = process.argv[2] ?? 'stream';

const testData = {
  id: crypto.randomUUID(),
  conversationId: crypto.randomUUID(),
  senderId: 'user-123',
  action: {
    text: {
      text: 'Hello, how are you?',
      language: 'en',
    },
  },
  profile: {
    id: 'profile-456',
    languages: ['en', 'es'],
  },
  conversation: {
    id: crypto.randomUUID(),
  },
  language: 'en',
};

async function testConversationEndpoint() {
  const url = `http://localhost:3000/conversation/message/${responseType}`;

  console.log(`Testing ${responseType.toUpperCase()} mode...`);
  console.log('Request:', JSON.stringify(testData, null, 2));
  console.log('\n--- Response ---\n');

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    if (responseType === 'stream') {
      // Handle SSE stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('No response body');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.substring(5).trim();
            if (data) {
              console.log('Event:', JSON.parse(data));
            }
          }
        }
      }
    } else {
      // Handle JSON response
      const data = await response.json();
      console.log('Actions:', JSON.stringify(data, null, 2));
    }

    console.log('\n✅ Test completed successfully!');
  } catch (error) {
    console.error('❌ Test failed:', error);
    process.exit(1);
  }
}

testConversationEndpoint();
