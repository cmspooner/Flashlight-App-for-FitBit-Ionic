function mySettings(props) {
  return (
    <Page>
      <Section 
        title={<Text bold align="center">SOS & Strobe</Text>}>
         <Toggle
           settingsKey="sosToggle"
           label="SOS"
         />
         <Text>SOS Interval (ms): {props.settingsStorage.getItem('sos')}</Text>
         <Slider
           settingsKey="sosSlider"
           min="100"
           max="500"
           step="10"
           onChange={value => props.settingsStorage.setItem('sos', value)}
         />
         <Toggle
           settingsKey="strobeToggle"
           label="Strobe"
         />
         <Text>Strobe Delay (ms): {props.settingsStorage.getItem('strobe')}</Text>
         <Slider
           settingsKey="strobeSlider"
           min="10"
           max="500"
           step="10"
           onChange={value => props.settingsStorage.setItem('strobe', value)}
         />
      </Section>
      
      <Section 
        title={<Text bold align="center">User Interface</Text>}>
         <Toggle
           settingsKey="showButtons"
           label="Show Button Labels"
         />
        <Text>
         Turning off buttons does not turn off the functionality, it just removes the text for a cleaner view.
        </Text>
         <Select
          label="Controls"
          settingsKey="controls"
          options={[
            {name:"Buttons"},
            {name:"Swipe"},
            {name:"Both"}
          ]}
          />
        <Text>
          When "Swipe" is turned on, you may swipe right to turn on SOS and left to turn on Strobe. Swiping either way in either mode will bring you back to the shome screen.
        </Text>
      </Section>
   
      <Section
        title={<Text bold align="center">Contact Me</Text>}>
        <Text>
          Please don't hesitiate to contact me with questions or suggestions; but be sure to let me know which app or watchface you are talking about. This and all my other apps will always be free and Open Source. If you really like my app please considder buying me a coffee (or more likely electonic components that end up in my classroom). Thanks!
        </Text>
        <Link source="https://rawgit.com/cmspooner/Flashlight-App-for-FitBit-Ionic/master/settings/email.html">
          <TextImageRow
            label="Email"
            sublabel="cmspooner@gmail.com"
            icon="https://github.com/cmspooner/Flashlight-App-for-FitBit-Ionic/blob/master/resources/icons/settings/Email.png?raw=true"
          />
        </Link>
        <Link source="https://github.com/cmspooner">
          <TextImageRow
            label="Github"
            sublabel="https://github.com/cmspooner"
            icon="https://github.com/cmspooner/Flashlight-App-for-FitBit-Ionic/blob/master/resources/icons/settings/Github.png?raw=true"
          />
        </Link>
        <Link source="https://paypal.me/CMSpooner">
          <TextImageRow
            label="PayPal"
            sublabel="cmspooner@gmail.com"
            icon="https://github.com/cmspooner/Flashlight-App-for-FitBit-Ionic/blob/master/resources/icons/settings/Paypal.png?raw=true"
          />
        </Link>
      </Section>
      <Section
        title={<Text bold align="center">Build Version and Notes</Text>}>
        <Text>
          4.3: Added Settings
        </Text>
        <Text>
          4.2: Remove Swipe Text, change threshold, Add Strobe 
        </Text>
        <Text>
          4.1: Remove Swipe Text, change threshold, Add Strobe 
        </Text>
        <Text>
          4.0: Adding swipe to change mode.
        </Text>
        <Text>
          3.2: fixed I hope?
        </Text>
        <Text>
          3.1: fixed small error
        </Text>
        <Text>
          3.0: SOS & Strobe Button
        </Text>
        <Text>
          2.0: Versa Compatible
        </Text>
        <Text>
          1.0: First official release
        </Text>
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);
