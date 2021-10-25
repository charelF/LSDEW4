import Example from "../components/ExampleChart"

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl py-10">
      <h1 className="text-2xl">LSDE 2021: DDoS Detection (M4)</h1>
      <ul>
        <li>
          <a href="https://www.linkedin.com/in/aleksander-janczewski/">Aleksander Janczewski</a>
          {/* https://www.linkedin.com/in/aleksander-janczewski/ */}
        </li>
        <li>
          <a href="https://www.linkedin.com/in/gilles-magalhaes-ribeiro/">Gilles Magalhaes</a>
          {/* https://www.linkedin.com/in/gilles-magalhaes-ribeiro/ */}
        </li>
        <li>
          <a href="https://cfx.lu">Charel Felten</a>
          {/* https://www.linkedin.com/in/charel-felten/ */}
        </li>
      </ul>

      <div className="mt-4">
        <h1 className="text-xl">Example graph</h1>
        <div style={{ width: '100%', height: 400 }}>
          <Example />
        </div>
      </div>


      <div className="pt-6 text-base mx-auto max-w-prose text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce aliquet, nunc sit amet accumsan porttitor, metus eros tincidunt ipsum, ac gravida purus tortor sit amet arcu. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel eros sit amet lectus dapibus condimentum id id lectus. Etiam molestie massa non fringilla vulputate. Donec velit enim, pellentesque nec felis quis, tempus tempor purus. Nullam tempor justo interdum, suscipit felis eu, cursus lacus. Proin vel nulla quis eros fermentum semper sagittis at nunc. Phasellus ut mauris id orci dignissim posuere ut at ante. Praesent elementum suscipit elit, in egestas sapien congue eu. Sed quis nisl nisi. Praesent in felis sed nulla mattis finibus quis sed nisi. Vivamus consequat arcu nec purus venenatis, a scelerisque eros congue.
        Vestibulum non convallis magna. Vestibulum congue tellus nisl, a mattis nisl egestas at. Quisque a ligula quis diam facilisis consectetur vitae nec eros. Suspendisse ac dolor vestibulum, volutpat mauris eu, cursus felis. Quisque auctor eu erat a tincidunt. Nam molestie tristique lorem eu aliquet. Vivamus dignissim, elit eu viverra tempor, nibh mi dapibus ligula, non dapibus velit sapien vel enim. Nunc odio arcu, euismod rhoncus libero in, aliquam cursus quam. Cras rhoncus blandit turpis at dictum. Phasellus venenatis quis ligula ac rhoncus. Donec eleifend leo et laoreet tristique. Vestibulum faucibus quis enim eu faucibus. Suspendisse justo lorem, laoreet non dictum ut, sollicitudin at nunc.
        Praesent rhoncus sagittis est a consectetur. Donec in urna quis nibh facilisis congue. Donec risus orci, tincidunt vel luctus a, ornare in lorem. Nam porta augue volutpat aliquet varius. Pellentesque nunc ligula, blandit quis eleifend vel, feugiat sed dolor. Integer id tristique nisl. Vivamus at diam vehicula, commodo lacus at, lacinia ligula. Vivamus consectetur efficitur justo. Proin ullamcorper luctus tellus vitae fermentum. Fusce id condimentum mi, at sodales nisl. Integer non turpis lobortis, dapibus magna sit amet, dignissim sapien. Sed vitae sapien ante. In in bibendum massa, consectetur congue libero. Nulla vel lacinia nunc.
      </div>
    </div>
  )
}
