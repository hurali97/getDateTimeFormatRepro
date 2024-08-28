import { Image, StyleSheet, Platform, Pressable, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {format as tzFormat, toZonedTime as utcToZonedTime} from 'date-fns-tz';
import {isValid} from 'date-fns';
import { startProfiling, stopProfiling } from 'react-native-release-profiler'

function formatWithUTCTimeZone(datetime: string, dateFormat = 'yyyy-MM-dd') {
  const date = new Date(datetime);

  if (isValid(date)) {
      return tzFormat(utcToZonedTime(date, 'UTC'), dateFormat);
  }

  return '';
}

function randomDate()
{
    //Month ranges between 1 to 12 months
    let month = Math.floor(Math.random()*(13-1)+1)
    //Identifying months which has 31 days
    let oddDays = [1,3,5,7,8,10,12]
    //Picking random year between 1901 to 2005
    let year = Math.floor(Math.random()*(2005-1900)+1900)
    //Checking whether random month we generated has 31 days
    let day31 = oddDays.includes(month)
    //Handling code if the month has 31 days
    if(day31)
    {
        //Generating date between 1 to 31 days
        let date = Math.floor(Math.random()*(32-1)+1)
        return new Date(year+'-'+month+'-'+date)  
    }
    else{
        //Checking whether the given year is a leap year and the month is february
        if(year%4 == 0 && month == 2)
        {
            //Since its a leap year we should have date ranging between 1 to 29
            let date = Math.floor(Math.random()*(30-1)+1)
            return new Date(year+'-'+month+'-'+date)
        }
        //checking whether the given year is not a leap year and the month is february
        else if(year%4 != 0 && month == 2)
        {
            //Since month is february, we are generating date ranging between 1 to 28
            let date = Math.floor(Math.random()*(29-1)+1)
            return new Date(year+'-'+month+'-'+date)
        }
        else{
            //Since it is not a leap year and the month is not february, we are generating date between 1 to 30
            let date = Math.floor(Math.random()*(31-1)+1)
            return new Date(year+'-'+month+'-'+date)
        }
    }
}

const onPress = () => {
  let arr = [];
    for (let i = 0; i < 5000; i++) {
      const asd = formatWithUTCTimeZone(randomDate().toDateString())
      arr.push(asd)
    }
    console.log('=== ', arr.length)
    stopProfiling(true)
}

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
          <Pressable onPress={() => {
             startProfiling()
             console.log('== started')
          }} style={{padding: 20, backgroundColor: '#ccc', marginTop: 30}}>
          <Text>Start Profiling</Text>
        </Pressable>
        <Pressable onPress={onPress} style={{padding: 20, backgroundColor: '#ccc', marginTop: 30}}>
          <Text>Stop Profiling</Text>
        </Pressable>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
