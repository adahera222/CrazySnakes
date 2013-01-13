#pragma strict

var ServerIP:String = "127.0.0.1";
var ServerPort:String = "30000";
var netIP:String = ServerIP + ":" + ServerPort;

function OnGUI()
{
	if(Network.peerType == NetworkPeerType.Disconnected)
	{
		netIP = GUILayout.TextField(netIP,25);
		//Debug.Log(netIP);
		
		if(GUILayout.Button("Connect"))
		{
			ServerIP = netIP.Split(":"[0])[0];
			//Debug.Log(ServerIP);
			ServerPort = netIP.Split(":"[0])[1];
			//Debug.Log(ServerPort);
			Network.Connect(ServerIP,parseInt(ServerPort));
		}
		if(GUILayout.Button("New Server"))
		{
			ServerIP = netIP.Split(":"[0])[0];
			//Debug.Log(ServerIP);
			ServerPort = netIP.Split(":"[0])[1];
			//Debug.Log(ServerPort);
			Network.InitializeServer(32,parseInt(ServerPort),false);
		}
	}
	else
	{
		if(Network.peerType == NetworkPeerType.Client)
		{
			GUILayout.Label("Client");
			
			if(GUILayout.Button("Logout"))
			{
				Network.Disconnect();
			}
		}
		
		if(Network.peerType == NetworkPeerType.Server)
		{
			GUILayout.Label("Server");
			GUILayout.Label("Connections: " + Network.connections.Length);
			
			if(GUILayout.Button("Stop Server"))
			{
				Network.Disconnect();
			}
		}
	}
}