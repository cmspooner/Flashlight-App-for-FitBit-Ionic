function mySettings(props) {
  return (
    <Page>
      <Section 
        title={<Text bold align="center">SOS & Strobe</Text>}>
         <Toggle
           settingsKey="sosToggle"
           label="SOS Button"
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
           label="Strobe Button"
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
        title={<Text bold align="center">Contact Me</Text>}>
        <Text>
          Please don't hesitiate to contact me with questions or suggestions. This and all my other apps will always be free and Open Source. If you really like my app please considder buying me a coffee (or more likely electonic components that end up in my classroom). Thanks!
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
          3.3.3: lowered Strobe Button
        </Text>
        <Text>
          3.3.2: Fixed settings
        </Text>
        <Text>
          3.3.1: Strobe!
        </Text>
        <Text>
          3.3: Adding Strobe
        </Text>
        <Text>
          3.2.1: Settings fix
        </Text>
        <Text>
          3.2: Settings
        </Text>
        <Text>
          3.0: SOS Button
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
