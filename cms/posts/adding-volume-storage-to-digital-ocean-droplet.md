---
active: true
title: Adding Volume Storage to Digital Ocean Droplet
published: 2020-06-11
category: general
id: adding-volume-storage-to-digital-ocean-droplet
---
I use Digital Ocean for all of my server side projects. Lately I have been having some random issues start to pop up, and the culprit has always been disk space filling up.

Digital Ocean offers Volume storage you can attach to your droplets, so you can add more space without upgrading RAM and CPU. Its like adding a USB to a computer. Here are my steps to troubleshoot and add volume storage. **Note that I'm not a server guy, I could be wildly wrong, but it works for me.**

First step, ssh into your server and run this command. It checks filesystem usage and percentages. As you can see below in my screenshot, I'm using 100% of `/dev/vda1`, not good. Another command I use is with the `—max-depth 1` flag. It shows the specific sizes of that directory. Very helpful to track down large log files or culprits.

```bash
df -h
```

```bash
sudo du -h  --max-depth 1
```

![/images/df_-h.png](/images/df_-h.png)

So I'm out of disk space and I need to add more. This is where Digital Ocean Volumes comes in. Go into your digital ocean dashboard, click on `Create`, and then choose Volume. Choose however large of size you need, choose which droplet to attach to, and then click on `Create Volume`

![/images/digital_ocean_volume_create.png](/images/digital_ocean_volume_create.png)

After it creates the new volume, it will bring up a list of commands and instructions on what to do next. Most of these we will follow with a few modifications.

Since I want to continue to use my home directory for my sites, the basic process will go like this.

1. Format our new volume so we can actually store files on it
2. Rename my current home directory.
3. Create a new mount point (directory) for that volume. In my case, I want it to be my home directory.
4. Mount the new volume to the new user home directory
5. Clone permissions from old home directory and remove all content from old directory
6. Move all content from the previous home directory into the new

### Step 1. Format new volume

Digital Ocean will give you this command after creating volume. If you accidentally closed it, just find your new volume and click on the down arrow and click on `Configure Instructions`

```bash
sudo mkfs.ext4 /dev/disk/by-id/scsi-0DO_Volume_volume-nyc1-01
```

### Step 2. Rename your desired directory

I want to continue to use my `/home/forge` directory. I will rename `/home/forge` to `/home/forge-backup` so I can mount my new volume to `/home/forge`

```bash
mv /home/forge /home/forge-backup
```

### Step 3. Create a mount point for the new volume

This is where the new volume will be mounted. I want to continue to use /home/forge, so thats what I will name my new mount point.

```bash
mkdir -p /home/forge
```

### Step 4. Mount the new volume & update fstab

Now that we have our new directory created, lets mount our new volume to this directory. Make sure to replace `/home/forge` with your new directory.

```bash
mount -o discard,defaults,noatime /dev/disk/by-id/scsi-0DO_Volume_volume-nyc1-01 /home/forge
```

Now change fstab so the volume will be mounted after reboot. Again, make sure to replace `/home/forge`, and `/dev/disk/by-id/scsi-0D0_Volume_volume-nyc1-01` with your own values

```bash
echo '/dev/disk/by-id/scsi-0DO_Volume_volume-nyc1-01 /home/forge ext4 defaults,nofail,discard 0 0' | sudo tee -a /etc/fstab
```

After the fstab is updated, mount the drive (or reboot according to digital ocean)

```bash
sudo mount -a
```

Run `df -h` again, and we should see our new volume attached and where its mounted on. As you can see, our new volume, `/dev/sda`, is mounted on `/home/forge` and has 47G available

![/images/df_-h_after_mount.png](/images/df_-h_after_mount.png)

### Step 5. Update Permissions

Now lets update permissions from our old forge directory to our new

```bash
sudo chown -R --reference=/home/forge-backup /home/forge
sudo chmod -R --reference=/home/forge-backup /home/forge
```

### Step 6. Move content into new folder

Now that we are ready to go with our new volume attached, we can move all of our website data into our new folder. Add `-v` flag to the command to see the output as it moves files and folders.

```bash
mv /home/forge-backup/* /home/forge/
```

Once its done moving, browse around in your new /home/forge directory and make sure everything looks right. If everything was moved over successfully, you can remove the old `/home/forge-backup` directory.

```bash
rm -rf forge-backup/
```

Now run `df -h` again to see new disk space and availability.

![/images/df_-h_after_move.png](/images/df_-h_after_move.png)

### Success! 🎉

We have successfully added volume storage to our digital ocean droplet and we don't have strange error messages anymore. Go us!