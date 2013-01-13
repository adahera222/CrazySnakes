#pragma strict

var aPlayer:Transform;

function OnServerInitialized()
{
	SpawnAPlayer();
}

function OnConnectedToServer()
{
	SpawnAPlayer();
}

function SpawnAPlayer()
{
	Network.Instantiate(aPlayer, transform.position, transform.rotation, 0);
}

function OnPlayerDisconnected(aPlayer:NetworkPlayer)
{
	Network.RemoveRPCs(aPlayer);
	Network.DestroyPlayerObjects(aPlayer);
}

function OnDisconnectedFromServer(info:NetworkDisconnection)
{
	Network.RemoveRPCs(Network.player);
	Network.DestroyPlayerObjects(Network.player);
	Application.LoadLevel(Application.loadedLevel);
}